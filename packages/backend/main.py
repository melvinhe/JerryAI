from fastapi import FastAPI
from transformers import pipeline
import tensorflow as tf
import asyncio
from pydantic import BaseModel
from datetime import date
import os
import openai
from dotenv import load_dotenv
from pathlib import Path

app = FastAPI()

#TODO:
# summarization
# clasification
#    find commities based on classification
#    who to contact?
#    
# likelyness to pass
# similar bills?
# 

class Data(BaseModel):
    message: str


dotenv_path = Path('..\MinneHack-2023\.env')
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/summerize")
async def summerize(data: Data):
    """
    Model type: Tensorflow
    returns a summerization of message that is provided
    """

    summarizer = pipeline(
        "summarization", model="philschmid/bart-large-cnn-samsum")

    return summarizer(data.message)


@app.post("/billCassification")
async def billCassification(message):
    """
    provide a summarization of the bill in which you would like to classify

    Model type: TensorFlow
    
    **NOTE: this model is case sensative

    returns JSON with classification groups, along with 'percent' classified to each group

    """

    classifier = pipeline(
        "text-classification", model="z-dickson/CAP_coded_US_Congressional_bills")
    
    return classifier(message)



@app.post("/BillDirection")
async def BillDirection(data: Data):
    """s
    takes in a prompt then provides direction of where to go to get this bill passed

    Model type: PyTorch

    """

    generator = pipeline(
        "text2text-generation", model="bheshaj/bart-large-cnn-small-billsum-5epochs")
    
    return generator(data.message)


@app.post("/getProposal")
async def getProposal(prompt):
    today = date.today()
    intro = f"""
    {today}\n
    (officials name)\n
    (officials title)\n
    (office/commitee title)\n
    (officials address)\n
    (officials city, state and zip code)\n\n
    """

    title = getTitle(prompt)

    body = getBody(prompt)

    ethank = """I am looking forward to hearing your input on this and am hoping you consider my input.\n
                Thank you for your time and consideration.\n\n
                Sincerely,\n\n
                \n\n\n
                (your name)"""
    
    return (intro + title[0]['generated_text'] + "\n" + body + "\n" + ethank)


def getTitle(message):
    """
    takes in a prompt then provides a title based on the scentence

    Model type: PyTorch

    """

    generator = pipeline(
        "text2text-generation", model="czearing/article-title-generator")
    
    return generator(message)



def getBody(prompt):

    gpt_prompt = f"""Create me a proposal for a legislative bill. This is a {prompt}
    Structure it in a 4 paragraph format. First paragraph states why it the topic is imporant. The second paragraph will provide relevant
    statistics on the topic. The third paragraph will talk about how the bill will be benifitial in any way. The fourth paragrph should
    wrap up this letter, and ask for a pertnership or the abulity to work together with this person in the future to fix this issue.     
    """
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=gpt_prompt,
        temperature=1.0, #A low temperature (near 0) is going to give very well-defined answers consistently while a higher number (near 1) will be more creative in its responses
        max_tokens=750,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0
    )
    #
    return(response['choices'][0]['text'])

# for testing
# msg = "a bill proposal that addresses an invasive species in Minnesota. The intended outcome would be to eliminate or reduce the population of the invasive species"
# smtst = "a bill proposal that addresses an invasive species in Minnesota"
# output = asyncio.run(summerizePY(smtst))
# print(output)



