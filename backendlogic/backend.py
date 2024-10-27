from flask import Flask, request, jsonify, redirect, render_template
from flask_cors import CORS
from apiinteraction import detect_AI
from gpt_text import detectScam_WHISPER
from whisper import detectScamCall
import os


super_text = ""
app = Flask(__name__)
CORS(app)

@app.route("/hello")
def greet():
    return "This is Me"

@app.route("/detect-ai", methods=['POST'])
def detect_email_text():
    # Extract the input text from the JSON request body
    data = request.get_json()
    if not data or 'input-text' not in data:
        return jsonify({"error": "No input_text provided"}), 400
    
    input_text = data['input-text']
    
    return jsonify(detect_AI(input_text))
@app.route("/detect-voice", methods=['POST'])
def detect_audio_scam():
    global super_text
    # Add headers to allow for long-running requests
    response_headers = {
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    }
    
    try:
        if 'file' not in request.files:
            return "No file part in the request", 400, response_headers

        file = request.files['file']

        if file.filename == '':
            return "No file selected for uploading", 400, response_headers

        # Save the file to local storage
        file_path = os.path.join("./", file.filename)
        file.save(file_path)

        # Call your processing methods
        text = detectScamCall(file_path)
        print("Transcription complete:", text)
        result = detectScam_WHISPER(text)
        print("Analysis complete:", result)
        
        # Clean up
        os.remove(file_path)
        print("RESULT")
        print(result)
        super_text = result
        print("SUPER TEXT")
        print(super_text)
        return result, 200, response_headers
        
    except Exception as e:
        print("Error occurred:", str(e))
        return str(e), 500, response_headers
    
@app.route("/get-transcript", methods=["GET"])
def return_transcript():
    global super_text
    return super_text, 200

@app.route("/clear-transcript", methods=["GET"])
def clear_transcript():
    global super_text
    print("CLEARING SUPER TEXT")
    super_text = ""
    return "", 200
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4080)

@app.route("/go-to-quiz", methods = ["POST"])
def go_to_quiz():
    return redirect("http://localhost:8080/index.html")
#is_spooky = request.args.get('spooky') == 'true
#/{NORMAL ROUTE}?spooky=true
#normal route
#spooky route
