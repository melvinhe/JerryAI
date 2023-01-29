from datetime import date
import os
import openai
from dotenv import load_dotenv
from pathlib import Path


gpt3_apiKey = "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"

# Returns the current local date
today = date.today()



openai.api_key = os.getenv("OPENAI_API_KEY")


def generateIntro():
    today = date.today()

    

    gpt_prompt = """Create me a proposal for a legislative bill that would help reduce zebra muscles in lake mille lacs in minnesota.\n
    Structure it in a 3 paragraph format. First paragraph states why it the topic is imporant. The second paragraph will provide relevant
    statistics on the topic. The third paragraph will talk about how the bill will be benifitial in any way.
    
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
    print(response['choices'][0]['text'])


def getModels():
    models = openai.Model.list()

    for model in models.data:
        print(model.id)


generateIntro()


