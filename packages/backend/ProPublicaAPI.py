import requests


endpoint = "https://api.propublica.org/congress/v1/115/senate/committees.json"

header = ""


def getReleventPersonInfo():
    msg = "health"

    cID = getCIDS(msg)
    cInfo = getCInfo(cID)
    MemberInfoList = memberInfo(cInfo)
    return MemberInfoList


def getCIDS(cType):
    endpoint = "https://api.propublica.org/congress/v1/115/senate/committees.json"

    header = {'X-API-Key': ''}

    response = requests.get(endpoint, headers=header)

    data = response.json()

    goodCID = []

    for committee in data['results'][0]['committees']:
        if cType.casefold() in str(committee['name']).casefold():
            goodCID.append(committee['id'])

    return goodCID

def getCInfo(goodCID):
    cInfo = []
    for cid in goodCID:
        endpoint = f"https://api.propublica.org/congress/v1/115/senate/committees/{cid}.json"
        header = {'X-API-Key': ''}
        response = requests.get(endpoint, headers=header)
        data = response.json()
        
        for member in data['results'][0]['current_members']:
            cInfo.append(str(member['id']))
            #print(str(member['id']))
 
    return cInfo
    

def memberInfo(memberList):
    memberInfoList = []
    endpoint = f"https://api.propublica.org/congress/v1/116/senate/members.json"
    header = {'X-API-Key': ''}
    response = requests.get(endpoint, headers=header)
    data = response.json()
    for members in data['results'][0]['members']:
        if members['id'] in memberList:
            memberInfoList.append(members)
    return memberInfoList

    

    

doAll()
