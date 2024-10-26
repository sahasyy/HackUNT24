const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionElement = document.getElementById('question-img');
const answerButtonsElement = document.getElementById('answer-buttons');
const trickBtn = document.getElementById('trick');
const treatBtn = document.getElementById('treat');
const explanation = document.getElementById('explanation');

let shuffledQuestions, currentQuestionIndex, score;

let tricks = [];
let treats = [];

const questions = ["000000.jpg", "000006.jpg"];
console.log(questionElement);

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
trickBtn.addEventListener('click', () => selectAnswer(true));
treatBtn.addEventListener('click', () => selectAnswer(false));


function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    questionElement.classList.remove('hide');
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
    questionElement.src = "imgs/" + question;
}

function resetState() {
    nextButton.classList.add('hide');
    trickBtn.classList.remove('hide');
    treatBtn.classList.remove('hide');
    questionElement.classList.remove('hide');
    explanation.classList.add('hide');
}

function selectAnswer(isScam) {
    const correct = shuffledQuestions[currentQuestionIndex].isScam === isScam;
    if (correct) score++;
    nextButton.classList.remove('hide');
    questionElement.classList.add('hide');
    trickBtn.classList.add('hide');
    treatBtn.classList.add('hide');
    explanation.classList.remove('hide');
}

function endGame() {
    questionElement.classList.add('hide');
    trickBtn.classList.add('hide');
    treatBtn.classList.add('hide');
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
}
