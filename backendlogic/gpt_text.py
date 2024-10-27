from openai import OpenAI
from dotenv import load_dotenv
import os
import json
load_dotenv()
open_ai_key = os.getenv("OPENAI_API_KEY")
project_id = os.getenv("PROJECT_ID")

client = OpenAI()

#def explain(testObj):

def detectScam_GPT(text: str):
    prompt = "I am going to pass the content of an email. You must determine whether this email is a scam or not, if it's a phishing email. Then you must return A MAXIMUM 2-3 sentence explanation on why it is or isn't a scam. Here's the text\n" + text
    response = client.chat.completions.create(
    messages=[{
        "role": "user",
        "content": prompt,
    }],
    model="gpt-4o-mini",
    )
    return response.choices[0].message.content


def detectScam_WHISPER(text: str):
    prompt = "I am going to pass the content of an audio transcription. You must determine whether this call is a scam or not, if it's a scam call. Then you must return A MAXIMUM 2-3 sentence explanation on why it is or isn't a scam. Here's the text\n" + text
    response = client.chat.completions.create(
    messages=[{
        "role": "user",
        "content": prompt,
    }],
    model="gpt-4o-mini",
    )
    return response.choices[0].message.content
