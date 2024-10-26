const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultContainer = document.getElementById('result');
const scoreElement = document.getElementById('score');

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
    { text: "You have won a free iPhone! Click here to claim your prize.", isScam: true },
    { text: "Your bank account has been compromised. Call this number immediately to resolve the issue.", isScam: true },
    { text: "Reminder: Your doctor's appointment is tomorrow at 3 PM.", isScam: false },
    { text: "You owe unpaid taxes to the IRS. Pay now to avoid legal action.", isScam: true },
    { text: "Don't miss out on this exclusive investment opportunity. Reply for more details.", isScam: true },
    { text: "Update: Your package is on the way and will arrive by the end of the day.", isScam: false },
    { text: "We have detected unusual activity on your account. Log in here to verify your identity.", isScam: true },
    { text: "Join our loyalty program for free rewards on your purchases.", isScam: false },
    { text: "Get a free $100 gift card by completing this survey.", isScam: true },
    { text: "Congratulations, you've been selected for a special offer! Click to learn more.", isScam: true }
];

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    questionContainer.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < questions.length) {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    } else {
        endGame();
    }
}

function showQuestion(question) {
    questionElement.innerText = question.text;
    const trueButton = document.createElement('button');
    trueButton.innerText = 'Scam';
    trueButton.classList.add('btn');
    trueButton.addEventListener('click', () => selectAnswer(true));
    answerButtonsElement.appendChild(trueButton);

    const falseButton = document.createElement('button');
    falseButton.innerText = 'Not a Scam';
    falseButton.classList.add('btn');
    falseButton.addEventListener('click', () => selectAnswer(false));
    answerButtonsElement.appendChild(falseButton);
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(isScam) {
    const correct = shuffledQuestions[currentQuestionIndex].isScam === isScam;
    if (correct) score++;
    scoreElement.innerText = score;
    nextButton.classList.remove('hide');
}

function endGame() {
    questionContainer.classList.add('hide');
    resultContainer.classList.remove('hide');
    resultContainer.innerHTML = `Your Score: ${score}/${questions.length}`;
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
}
