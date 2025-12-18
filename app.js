// Quiz data
let quizData = [
    {
        question: "1. Which of these is a JavaScript data type?",
        options: ['Number', 'Character', 'Float', 'StringBuilder'],
        answer: 'Number'
    },
    {
        question: "2. What does `typeof NaN` return in JavaScript?",
        options: ['Number', 'String', 'Undefined', 'Object'],
        answer: 'Number'
    },
    {
        question: "3. Which method converts a JSON string into a JavaScript object?",
        options: ['JSON.stringify()', 'JSON.parse()', 'JSON.object()', 'JSON.convert()'],
        answer: 'JSON.parse()'
    },
    {
        question: "4. Which of the following is NOT a JavaScript framework/library?",
        options: ['React', 'Angular', 'Vue', 'Django'],
        answer: 'Django'
    },
    {
        question: "5. What will `console.log(0.1 + 0.2 === 0.3)` output?",
        options: ['true', 'false', 'undefined', 'Error'],
        answer: 'false'
    },
    {
        question: "6. Which keyword is used to declare a variable in ES6?",
        options: ['var', 'let', 'const', 'All of the above'],
        answer: 'All of the above'
    },
    {
        question: "7. How do you write a single-line comment in JavaScript?",
        options: ['<!-- comment -->', '// comment', '/* comment */', '# comment'],
        answer: '// comment'
    },
    {
        question: "8. Which method adds one or more elements to the end of an array?",
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        answer: 'push()'
    },
    {
        question: "9. What does `===` mean in JavaScript?",
        options: ['Equal value', 'Equal value and type', 'Assignment', 'Not equal'],
        answer: 'Equal value and type'
    },
    {
        question: "10. Which of the following is used to declare a function in JavaScript?",
        options: ['function myFunc() {}', 'def myFunc() {}', 'func myFunc() {}', 'method myFunc() {}'],
        answer: 'function myFunc() {}'
    }
];


// DOM elements
let startBtn = document.getElementById("startQuiz");
let startScreen = document.getElementById("startScreen");
let quizScreen = document.getElementById("quizScreen");
let resultScreen = document.getElementById("resultScreen");

// Variables
let currentQuestionIndex = 0;
let score = 0;

// Start Quiz
startBtn.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    showQuestion();
});

// Show question
function showQuestion() {
    let currentQuestion = quizData[currentQuestionIndex];

    quizScreen.innerHTML = `
        <h2>Web Development Quiz</h2>
        <div class="currentQuestion">
            <p class="questionNo">${currentQuestionIndex + 1}/${quizData.length}</p>
        </div>
        <h3>${currentQuestion.question}</h3>
        <div class="options" id="options">
            <button onclick="checkAns(this)">${currentQuestion.options[0]}</button>
            <button onclick="checkAns(this)">${currentQuestion.options[1]}</button>
            <button onclick="checkAns(this)">${currentQuestion.options[2]}</button>
            <button onclick="checkAns(this)">${currentQuestion.options[3]}</button>
        </div>
        <div class="nextBtn">
            <button onclick="nextQuestion()" id="nextBtn">Next</button>
        </div>
    `;
    document.getElementById("nextBtn").style.display = "none"; // hide Next button initially
}

// Check answer
function checkAns(selectedBtn) {
    let allOptions = document.querySelectorAll('#options button');
    let correctAnswer = quizData[currentQuestionIndex].answer;

    allOptions.forEach(btn => btn.disabled = true); // disable all options

    if (selectedBtn.innerHTML === correctAnswer) {
        selectedBtn.style.backgroundColor = "green";
        score++;
    } else {
        selectedBtn.style.backgroundColor = "red";
        // highlight correct option
        allOptions.forEach(btn => {
            if (btn.innerHTML === correctAnswer) {
                btn.style.backgroundColor = "green";
            }
        });
    }

    document.getElementById("nextBtn").style.display = "inline-block";
}

// Next question
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        // Show result using your existing resultScreen
        quizScreen.classList.add("hidden");
        resultScreen.classList.remove("hidden");

        // Update the button text with score
        let resultBtn = document.getElementById("resultQuiz");
        resultBtn.innerText = `${score} / ${quizData.length}`;

        // Optional: make result button restart quiz
        resultBtn.onclick = restartQuiz;
    }
}

// Restart quiz
// Get restart button
let restartBtn = document.getElementById("restartBtn");
restartBtn.addEventListener("click", restartQuiz);

// Restart quiz function
function restartQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    resultScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
}
