const questionElement = document.getElementById('message-image');
const answerButtonsElement = document.getElementById('game-buttons');
const trickBtn = document.getElementById('trick-btn');
const treatBtn = document.getElementById('treat-btn');
const explanation = document.getElementById('explanation');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

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
        redFlags: "This email displays several suspicious elements: It creates a sense of urgency by claiming a package is waiting for delivery, which is often used to prompt quick action. The sender's email address does not match the official FedEx domain. The links in the email direct to untrusted websites that could potentially steal your personal information. Additionally, the message contains grammatical errors and formatting issues, which are common signs of phishing attempts. Legitimate FedEx communications typically include a tracking number and come from a verified FedEx email address",
        isScam: true
    }
];

trickBtn.addEventListener('click', () => selectAnswer(true));
treatBtn.addEventListener('click', () => selectAnswer(false));

startGame();

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
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
    currentQuestionIndex++;
    setNextQuestion();
}

function endGame() {
    questionElement.classList.add('hide');
    trickBtn.classList.add('hide');
    treatBtn.classList.add('hide');
    nextButton.classList.add('hide');
    
    explanation.innerHTML = `
        <h2>Game Over!</h2>
        <p>Your score: ${score} out of ${questionsInOrder.length}</p>
        <button onclick="startGame()" class="btn">Play Again</button>
    `;
    explanation.classList.remove('hide');
}
