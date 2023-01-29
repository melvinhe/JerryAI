import requests
import os

from dotenv import load_dotenv
from pathlib import Path

#TODO: REMOVE API KEY
#apiKey = "0wAzf3lBzqPfP5zl6LviU16JP0E2NGDGIsGxKQyY"



# api_url = "https://api.congress.gov/v3/bill?&format=json"
# response = requests.get(api_url)
# response.json()

def doAll():
    msg = "families"
    print(getCInfo(getCIDS(msg)))


def getCIDS(cType):
    url = 'https://api.congress.gov/v3/committee/house?limit=250&api_key=0wAzf3lBzqPfP5zl6LviU16JP0E2NGDGIsGxKQyY'

    response = requests.get(url)

    data = response.json()

    goodCID = []

    for committee in data['committees']:
        if cType.casefold() in str(committee['name']).casefold():
            goodCID.append(str(committee['systemCode']))
    print(goodCID)
    return goodCID

def getCInfo(goodCID):
    cInfo = []
    for cid in goodCID:
        url = f'https://api.congress.gov/v3/committee/house/{cid}?limit=250&api_key=0wAzf3lBzqPfP5zl6LviU16JP0E2NGDGIsGxKQyY'
        response = requests.get(url)
        data = response.json()
 
        return data
    
    

doAll()
