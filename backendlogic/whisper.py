from openai import OpenAI
from dotenv import load_dotenv
import os
import json
from gpt_text import detectScam_WHISPER
load_dotenv()
open_ai_key = os.getenv("OPENAI_API_KEY")
project_id = os.getenv("PROJECT_ID")

client = OpenAI()

def detectScamCall(filePath):


    print(f'Name of File {filePath}')
    audio_file = open(filePath ,"rb")
    transcription = client.audio.transcriptions.create(
    model="whisper-1", 
    file=audio_file, 
    response_format="text"
    )
    return transcription

