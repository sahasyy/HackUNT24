const questionElement = document.getElementById('message-image');
const answerButtonsElement = document.getElementById('game-buttons');
const trickBtn = document.getElementById('trick-btn');
const treatBtn = document.getElementById('treat-btn');
const explanation = document.getElementById('explanation');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;
let intermediateImageShown = false; // Flag to track if the intermediate image has been shown

// Array representing the sequence of answers: treat, treat, trick, treat, trick
const answerPattern = [false, false, true, false, true];

// Selected questions to follow the answer pattern
const questionsInOrder = [
    {
        src: "githubreal.webp",
        greenFlags: "This is a legitimate GitHub collaboration invite. The email uses official GitHub branding and formatting consistent with their style. All links point to the secure github.com domain with HTTPS. It clearly explains the 7-day expiration timeline and provides both accept and decline options. The email includes specific details like the recipient's email and shows clear profile pictures and repository information. It also includes built-in abuse reporting and blocking options for security.",
        isScam: false
    },
    {
        src: "kagglereal.png",
        greenFlags: "This is a legitimate email from Kaggle as it contains proper sender authentication (noreply@kaggle.com) and official branding. The content provides specific, verifiable details about the Aya Expanse model including collaborator numbers, language support, and named researchers. The professional formatting, concrete event details, and alignment with Kaggle's role as an ML platform further confirm its authenticity.",
        isScam: false
    },
    {
        src: "geicofake.png",
        redFlags: "This is a deceptive email with several red flags: The sender address '<support@fast-pay.co>' is not a legitimate GEICO domain. The email creates artificial urgency about policy cancellation to pressure quick action. The 'Make a Payment' button likely leads to a phishing site. While the email copies GEICO's branding, the unprofessional formatting and suspicious payment portal links indicate a scam. Legitimate insurance companies typically send multiple notices through verified channels before any policy cancellation.",
        isScam: true
    },
    {
        src: "amexreal.webp",
        greenFlags: "This legitimate American Express email shows several security features: It's sent from a verified @americanexpress.com domain with a blue checkmark. The design professionally matches AmEx's brand guidelines. It displays your actual partial card number and accurate member-since date. The email includes proper unsubscribe options and email preferences. There's no urgent action required or threatening language. It correctly references FDIC insurance and includes authentic card images and account details. The footer contains proper legal disclaimers, and it offers a 'View this online' option for additional security.",
        isScam: false
    },
    {
        src: "fedexfake.png",
        redFlags: "This email displays several suspicious elements: It creates a sense of urgency by claiming a package is waiting for delivery, which is often used to prompt quick action. The sender's email address does not match the official FedEx domain. The links in the email direct to untrusted websites that could potentially steal your personal information. Additionally, the message contains grammatical errors and formatting issues, which are common signs of phishing attempts. Legitimate FedEx communications typically include a tracking number and come from a verified FedEx email address.",
        isScam: true
    }
];

trickBtn.addEventListener('click', () => selectAnswer(true));
treatBtn.addEventListener('click', () => selectAnswer(false));

startGame();

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    intermediateImageShown = false; // Reset the flag at the start of the game
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < questionsInOrder.length) {
        showQuestion(questionsInOrder[currentQuestionIndex]);
    } else {
        endGame();
    }
}

function showQuestion(question) {
    questionElement.src = question.src;
}

function resetState() {
    trickBtn.classList.remove('hide');
    treatBtn.classList.remove('hide');
    questionElement.classList.remove('hide');
    nextButton.classList.add('hide');
    explanation.classList.add('hide');
    explanation.innerHTML = '';
}

function selectAnswer(isScam) {
    const correct = answerPattern[currentQuestionIndex] === isScam;
    const currentQuestion = questionsInOrder[currentQuestionIndex];

    // Hide buttons
    trickBtn.classList.add('hide');
    treatBtn.classList.add('hide');
    
    // Show feedback
    nextButton.classList.remove('hide');
    explanation.classList.remove('hide');
    let feedbackHTML = `
        <h2>${correct ? '✅ Correct!' : '❌ Incorrect!'}</h2>
        <p>This is ${currentQuestion.isScam ? 'a SCAM email' : 'a LEGITIMATE email'}.</p>
    `;
    
    // Add flags
    if (currentQuestion.isScam) {
        feedbackHTML += `<h1>Red Flags:</h1><p>${currentQuestion.redFlags}</p>`;
    } else {
        feedbackHTML += `<h1>Green Flags:</h1><p>${currentQuestion.greenFlags}</p>`;
    }
    
    explanation.innerHTML = feedbackHTML;
    
    if (correct) score++;
}

function nextQuestion() {
    if (!intermediateImageShown) {
        // Show the intermediate image only the first time
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundImage = "url('404error.gif')";
        overlay.style.backgroundSize = 'cover';
        overlay.style.backgroundPosition = 'center';
        overlay.style.zIndex = '1000';
        
        document.body.appendChild(overlay);
        
        // Wait for 0.9 seconds, then remove the overlay and show the next question
        setTimeout(() => {
            document.body.removeChild(overlay);
            currentQuestionIndex++;
            setNextQuestion();
            intermediateImageShown = true; // Set the flag to true after showing the image
        }, 900);
    } else if (currentQuestionIndex === 2) {
        // Show momo.webp for 60 ms after the third question
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundImage = "url('momo.webp')";
        overlay.style.backgroundSize = 'cover';
        overlay.style.backgroundPosition = 'center';
        overlay.style.zIndex = '1000';
        
        document.body.appendChild(overlay);
        
        // Wait for 60 milliseconds, then remove the overlay and proceed to the next question
        setTimeout(() => {
            document.body.removeChild(overlay);
            currentQuestionIndex++;
            setNextQuestion();
        }, 60);
    } else if (currentQuestionIndex === questionsInOrder.length - 1) {
        // If it's the last question, change the next button text to "Get Results"
        nextButton.textContent = "Voice Analysis";
        currentQuestionIndex++;
        setNextQuestion();
    } else {
        // If no special image is needed, proceed to the next question directly
        currentQuestionIndex++;
        setNextQuestion();
    }
}

function endGame() {
    questionElement.classList.add('hide');
    trickBtn.classList.add('hide');
    treatBtn.classList.add('hide');
    nextButton.classList.add('hide');
    
    explanation.innerHTML = `
        <h2>Game Over!</h2>
        <p>Your score: ${score} out of ${questionsInOrder.length}</p>
        <button onclick="showFinalImage()" class="btn">Get Results</button>
    `;
    explanation.classList.remove('hide');
}

function showFinalImage() {
    // Show output1.gif for 5 seconds before redirecting to the results page
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundImage = "url('scary.gif')";
    overlay.style.backgroundSize = 'cover';
    overlay.style.backgroundPosition = 'center';
    overlay.style.zIndex = '1000';
    
    document.body.appendChild(overlay);
    
    // Wait for 5 seconds, then redirect to the results page
    setTimeout(() => {
        document.body.removeChild(overlay);
        window.location.href = "results.html"; // Change to the actual results page URL
    }, 5000);
}
