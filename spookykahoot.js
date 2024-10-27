const questionElement = document.getElementById('message-image');
const answerButtonsElement = document.getElementById('game-buttons');
const trickBtn = document.getElementById('trick-btn');
const treatBtn = document.getElementById('treat-btn');
const explanation = document.getElementById('explanation');
const nextButton = document.getElementById('next-btn');

let shuffledQuestions, currentQuestionIndex, score;

let tricks = [];
let treats = [];

const questions = [
    {
        src: "imgs/github-collab-invite.webp",
        greenFlags: "This is a legitimate GitHub collaboration invite. The email uses official GitHub branding and formatting consistent with their style. All links point to the secure github.com domain with HTTPS. It clearly explains the 7-day expiration timeline and provides both accept and decline options. The email includes specific details like the recipient's email and shows clear profile pictures and repository information. It also includes built-in abuse reporting and blocking options for security.",
        isScam: false
    },
    {
        src: "imgs/kaggle_email.png",
        greenFlags: "This is a legitimate email from Kaggle as it contains proper sender authentication (noreply@kaggle.com) and official branding. The content provides specific, verifiable details about the Aya Expanse model including collaborator numbers, language support, and named researchers. The professional formatting, concrete event details, and alignment with Kaggle's role as an ML platform further confirm its authenticity.",
        isScam: false
        
    },
    {
        src: "imgs/600b040d8a6af53c5043dcbf_geico-phishing-example-p-2000.png",
        redFlags: "This is a deceptive email with several red flags: The sender address '<support@fast-pay.co>' is not a legitimate GEICO domain. The email creates artificial urgency about policy cancellation to pressure quick action. The 'Make a Payment' button likely leads to a phishing site. While the email copies GEICO's branding, the unprofessional formatting and suspicious payment portal links indicate a scam. Legitimate insurance companies typically send multiple notices through verified channels before any policy cancellation.",
        isScam: true
    },
];
const others = [
    {
        src: "imgs/600af6fea791ace718dc9106_Best-Buy-Phishing-Example-p-2000.png",
        redFlags: "This email shows multiple red flags: It uses urgent language to create pressure for quick action. The sender's email address looks similar to but isn't quite the official domain. The links in the email likely lead to suspicious URLs. Instead of using your actual name, it uses a generic greeting like 'Dear customer'.",
        isScam: true
    },
    {
        src: "imgs/600b02fd8a6af519af43d8f7_jimmy-johns-phishing-example.png",
        redFlags: "This email shows several suspicious elements: The offer seems unrealistically good to be true. The links in the email direct to untrusted websites that could steal your information. There are notable grammatical errors and typos throughout the message, which is common in phishing attempts.",
        isScam: true
    },
    {
        src: "imgs/600b03b808e3d02c23d8132e_docusign-phishing-example.png",
        redFlags: "This suspicious email asks for a document signature without any prior context or explanation. Legitimate DocuSign emails typically don't include unsolicited attachments. The scammer is impersonating DocuSign to appear more credible.",
        isScam: true
    },
    {
        src: "imgs/600b03c7e6ddc2affe0ad09d_doordash-phishing-example.png",
        redFlags: "This email raises several concerns: It claims there are payment issues to trick you into providing personal information. The email's formatting and visual elements don't match official DoorDash communications. The links in the email likely lead to domains that aren't associated with DoorDash.",
        isScam: true
    },
    {
        src: "imgs/600b033b00395b5430274dd3_calendly-phishing-example.png",
        redFlags: "This phishing attempt uses several deceptive tactics: It sends an unexpected meeting request to trick recipients. The links probably lead to a fake Calendly site with a slightly modified URL. The email contains unprofessional formatting and typographical errors, common indicators of a phishing attempt.",
        isScam: true
    },
    {
        src: "imgs/600b040d8a6af53c5043dcbf_geico-phishing-example-p-2000.png",
        redFlags: "This is a deceptive email with several red flags: The sender address '<support@fast-pay.co>' is not a legitimate GEICO domain. The email creates artificial urgency about policy cancellation to pressure quick action. The 'Make a Payment' button likely leads to a phishing site. While the email copies GEICO's branding, the unprofessional formatting and suspicious payment portal links indicate a scam. Legitimate insurance companies typically send multiple notices through verified channels before any policy cancellation.",
        isScam: true
    },
    {
        src: "imgs/github-collab-invite.webp",
        greenFlags: "This is a legitimate GitHub collaboration invite. The email uses official GitHub branding and formatting consistent with their style. All links point to the secure github.com domain with HTTPS. It clearly explains the 7-day expiration timeline and provides both accept and decline options. The email includes specific details like the recipient's email and shows clear profile pictures and repository information. It also includes built-in abuse reporting and blocking options for security.",
        isScam: false
    },
    {
        src: "imgs/amex-savings-offer.webp",
        greenFlags: "This legitimate American Express email shows several security features: It's sent from a verified @americanexpress.com domain with a blue checkmark. The design professionally matches AmEx's brand guidelines. It displays your actual partial card number and accurate member-since date. The email includes proper unsubscribe options and email preferences. There's no urgent action required or threatening language. It correctly references FDIC insurance and includes authentic card images and account details. The footer contains proper legal disclaimers, and it offers a 'View this online' option for additional security.",
        isScam: false
    },
];

const generalTips = {
    redFlags: [
        "Check the sender's email address carefully.",
        "Look for grammar mistakes or poor formatting.",
        "Hover over links to verify their destination.",
        "Avoid opening attachments from unknown sources.",
        "Ignore unsolicited urgent requests."
    ]
};

trickBtn.addEventListener('click', () => selectAnswer(true));
treatBtn.addEventListener('click', () => selectAnswer(false));

startGame();

function startGame() {
    //shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
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
    const currentQuestion = questions[currentQuestionIndex];
    const correct = currentQuestion.isScam === isScam;
    
    // Hide buttons and image
    //questionElement.classList.add('hide');
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
        <p>Your score: ${score} out of ${questions.length}</p>
        <button onclick="startGame()" class="btn">Play Again</button>
    `;
    explanation.classList.remove('hide');
}