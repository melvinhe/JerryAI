from datetime import date
import os
import openai
from dotenv import load_dotenv
from pathlib import Path
from transformers import pipeline


dotenv_path = Path('..\MinneHack-2023\.env')
load_dotenv()

# Returns the current local date
today = date.today()



openai.api_key = os.getenv("OPENAI_API_KEY")

def getProposal(prompt):
    

    intro = """
    {today}\n
    (officials name)\n
    (officials title)\n
    (office/commitee title)\n
    (officials address)\n
    (officials city, state and zip code)\n\n
    """

    title = str(getTitle(prompt))

    body = str(getBody(prompt))

    ethank = """I am looking forward to hearing your input on this and am hoping you consider my input.\n
                Thank you for your time and consideration.\n\n
                Sincerely,\n\n
                \n\n\n
                (your name)"""


async def getTitle(message):
    """
    takes in a prompt then provides a title based on the scentence

    Model type: PyTorch

    """

    generator = pipeline(
        "text2text-generation", model="czearing/article-title-generator")
    
    return generator(message)



def getBody(prompt):

    gpt_prompt = """Create me a proposal for a legislative bill. This is a {prompt} \n
    Structure it in a 4 paragraph format. First paragraph states why it the topic is imporant. The second paragraph will provide relevant
    statistics on the topic. The third paragraph will talk about how the bill will be benifitial in any way. The fourth paragrph should
    wrap up this letter, and ask for a pertnership or the abulity to work together with this person in the future to fix this issue.     
    """
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        temperature=1.0, #A low temperature (near 0) is going to give very well-defined answers consistently while a higher number (near 1) will be more creative in its responses
        max_tokens=750,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0
    )
    print(response['choices'][0]['text'])


def getModels():
    models = openai.Model.list()

    for model in models.data:
        print(model.id)

msg = "a bill proposal that addresses an invasive species in Minnesota. The intended outcome would be to eliminate or reduce the population of the invasive species"

getProposal(msg)
