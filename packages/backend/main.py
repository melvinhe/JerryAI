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
import requests
import json

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
async def billCassification(data: Data):
    """
    provide a summarization of the bill in which you would like to classify

    Model type: TensorFlow
    
    **NOTE: this model is case sensative

    returns JSON with classification groups, along with 'percent' classified to each group

    """

    classifier = pipeline(
        "text-classification", model="z-dickson/CAP_coded_US_Congressional_bills")
    
    return classifier(data.message)



@app.post("/BillDirection")
async def BillDirection(data: Data):
    """
    takes in a prompt then provides direction of where to go to get this bill passed

    Model type: PyTorch

    """

    generator = pipeline(
        "text2text-generation", model="bheshaj/bart-large-cnn-small-billsum-5epochs")
    
    return generator(data.message)

@app.post("/getReleventPersonInfo")
async def getReleventPersonInfo(data: Data):
    all_words = data.message.split()
    first_word= all_words[0]
    cID = getCIDS(first_word)
    print(cID)
    cInfo = getCInfo(cID)
    print(cInfo)
    header = {'X-API-Key': 'yXP0XABzoNU3didJEyfVma8wjJfX82S08PqFQ8w'}
    endpoint2 = f"https://api.propublica.org/congress/v1/members/{cInfo[0]}.json"
    response2 = requests.get(endpoint2, headers=header)
    data = response2.json()
    #memberInfoList.append(members)
    #print(data2)
    return data

    # MemberInfoList = memberInfo(cInfo)
    # return MemberInfoList


@app.post("/getProposal")
async def getProposal(data: Data):
    today = date.today()
    intro = f"""
    {today}\n
    (officials name)\n
    (officials title)\n
    (office/commitee title)\n
    (officials address)\n
    (officials city, state and zip code)\n\n
    """

    title = getTitle(data.message)

    #body = getBody(data.message)
    body = """THis is a random paragraph that it should grab from openai. mkaies sure to comment this out \n
               for when we actually have to call it"""

    ethank = """I am looking forward to hearing your input on this topic.\n
                Thank you for your time and consideration.\n\n
                Sincerely,\n\n\n
                (your name)"""
    
    return (intro + title[0]['generated_text'] + "\n" + body + ethank)


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





def getCIDS(cType):
    endpoint = "https://api.propublica.org/congress/v1/115/senate/committees.json"

    header = {'X-API-Key': 'yXP0XABzoNU3didJEyfVma8wjJfX82S08PqFQ8w'}

    response = requests.get(endpoint, headers=header)

    data = response.json()

    goodCID = []

    for committee in data['results'][0]['committees']:
        if str(cType).casefold() in str(committee['name']).casefold():
            goodCID.append(committee['id'])

    return goodCID

def getCInfo(goodCID):
    cInfo = []
    for cid in goodCID:
        endpoint = f"https://api.propublica.org/congress/v1/115/senate/committees/{str(cid)}.json"
        header = {'X-API-Key': 'yXP0XABzoNU3didJEyfVma8wjJfX82S08PqFQ8w'}
        response = requests.get(endpoint, headers=header)
        data = response.json()
        
        for member in data['results'][0]['current_members']:
            cInfo.append(str(member['id']))
            #print(str(member['id']))
 
    return cInfo
    

def memberInfo(memberList):
    memberInfoList = []
    endpoint = f"https://api.propublica.org/congress/v1/116/senate/members.json"
    header = {'X-API-Key': 'yXP0XABzoNU3didJEyfVma8wjJfX82S08PqFQ8w'}
    response = requests.get(endpoint, headers=header)
    data = response.json()
    for members in data['results'][0]['members']:
        if members['id'] in memberList:
            endpoint2 = f"https://api.propublica.org/congress/v1/members/{members['id']}.json"
            response2 = requests.get(endpoint2, headers=header)
            data2 = response2.json()
            #memberInfoList.append(members)
            print(data2)
            return data2

# for testing
# msg = "a bill proposal that addresses an invasive species in Minnesota. The intended outcome would be to eliminate or reduce the population of the invasive species"
#  smtst = "a bill proposal that addresses an invasive species in Minnesota"
#output = asyncio.run(getReleventPersonInfo("health"))
#print(output)



