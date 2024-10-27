from dotenv import load_dotenv
import os
import requests
import json
from gpt_text import detectScam_GPT
load_dotenv()
api_key = os.getenv("GPT_ZERO")
url = "https://api.zerogpt.com/api/detect/detectText"
# Request Headers
gpt_zero_headers = {
  'ApiKey': api_key,
}

def hitApi(sample_text:str):
        '''The response is an object '''
        payload = json.dumps({
            "text": "",
            "input_text": sample_text
        })
        
        response = requests.request("POST", url, headers=gpt_zero_headers, data=payload)
        #print("SUCCEEEDED")

        response = response.json()
        if(response['code'] == 200):
            obj = {"humanScore": "", "howFake": "", "gpt_detect": ""}
            #print(f"Human?: {response['data']['isHuman']}\nHow Fake: {response['data']['fakePercentage']}")
            humanScore = obj['humanScore'] = response['data']['isHuman']
            howFake = obj["howFake"] = response['data']['fakePercentage']
            humanScore = int(humanScore)
            howFake = int(howFake)
            obj["gpt_detect"] = detectScam_GPT(sample_text)
            return obj
                 
            
        elif(response['code'] == 422):
            raise Exception("Validation Error")
        elif(response['code'] == 500):
            raise Exception("Server Error")




def detect_AI(sample_text: str):
    return hitApi(sample_text)


