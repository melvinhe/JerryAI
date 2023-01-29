
import requests



#TODO: REMOVE API KEY
apiKey = "0wAzf3lBzqPfP5zl6LviU16JP0E2NGDGIsGxKQyY"



api_url = "https://api.congress.gov/v3/bill?{api_key}=&format=json"
response = requests.get(api_url)
response.json()