const quizData = [
    {
        "question": "What is the chemical symbol for gold?",
        "options": ["Au", "Ag", "Fe", "Cu"],
        "answer": "Au"
    },
    {
        "question": "Which gas do plants absorb during photosynthesis?",
        "options": ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        "answer": "Carbon Dioxide"
    },
    {
        "question": "What is the powerhouse of the cell?",
        "options": ["Nucleus", "Mitochondria", "Endoplasmic Reticulum", "Golgi Apparatus"],
        "answer": "Mitochondria"
    },
    {
        "question": "What is the largest planet in our solar system?",
        "options": ["Earth", "Jupiter", "Mars", "Venus"],
        "answer": "Jupiter"
    },
    {
        "question": "Which element is essential for human bone health?",
        "options": ["Iron", "Calcium", "Sodium", "Potassium"],
        "answer": "Calcium"
    },
    {
        "question": "What is the speed of light in a vacuum?",
        "options": ["300,000 km/s", "150,000 km/s", "500,000 km/s", "200,000 km/s"],
        "answer": "300,000 km/s"
    },
    {
        "question": "What is the chemical formula for water?",
        "options": ["H2O2", "CO2", "H2O", "O2"],
        "answer": "H2O"
    },
    {
        "question": "Which scientist is known for the theory of general relativity?",
        "options": ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Niels Bohr"],
        "answer": "Albert Einstein"
    },
    {
        "question": "What is the process by which plants make their own food?",
        "options": ["Respiration", "Photosynthesis", "Fermentation", "Digestion"],
        "answer": "Photosynthesis"
    },
    {
        "question": "Which gas is responsible for the greenhouse effect on Earth?",
        "options": ["Ozone", "Methane", "Carbon Dioxide", "Nitrous Oxide"],
        "answer": "Carbon Dioxide"
    }
];

let questions = [];
let selectedOptions = {};
let showResults = false;
let score = 0;
let timer = 0;
let isRunning = false;

function renderQuizContent() {
    let content = '<div>';

    questions.forEach((question, index) => {
        content += `
              <div>
                  <h3 class="question">${index + 1}. ${question.question}</h3>
                  <div class="questionoption">
                  <ul class="">
                  ${question.options.map((option, optionIndex) => `
                      <li class="control">
                          <label>
                              <input
                                  type="radio"
                                  value="${option}"
                                  ${selectedOptions[index] === option ? 'checked' : ''}
                                  onclick="handleOptionChange(${index}, '${option}')"
                              />
                              <div class="outer"><div class="inner"></div></div>
                             <span> ${option}<span>
                          </label>
                      </li>
                  `).join('')}
              </ul>
                  </div>
            
              </div>
          `;
    });

    content += '<div class="finishbutton"><button class="btn-primary" onclick="handleFinishQuiz()">Finish Test</button></div>';
    return content;
}

function handleOptionChange(questionIndex, option) {

    selectedOptions = {
        ...selectedOptions,
        [questionIndex]: option,
    };
    updateView();
}

function handleStartQuiz() {
    score = 0;
    showResults = false;
    timer = 0; // Initialize the timer
    isRunning = true;
    startTimer();
    updateView();
}
function handleFinishQuiz() {
    calculateScore();
    showResults = true;
    isRunning = false;

    // Clear the interval to stop the timer
    clearInterval(timerInterval);

    updateView();
}


function calculateScore() {
    let calculatedScore = 0;
    questions.forEach((question, index) => {
        if (selectedOptions[index] === question.answer) {
            calculatedScore += 1;
        }
    });
    score = calculatedScore;
}

// function startTimer() {
//     setInterval(() => {
//         timer += 1;
//         updateView();
//     }, 1000);
// }
let timerInterval;

function startTimer() {
    timerInterval = setInterval(() => {
        timer += 1;
        updateView();
    }, 1000);
}
function updateView() {
    const appElement = document.getElementById('app');
    appElement.innerHTML = '';

    if (!isRunning && !showResults) {
        appElement.innerHTML += '<div class="middle"> <div> <h1>Welcome to Emotion Analysis</h1> <p> We will start recording your current emotional condition when you hit button below and try to answer the questions below while we are analysing your stress level. </p> <button class="btn-primary" onclick="handleStartQuiz()">Start Analysis</button> </div> </div>';
    }

    if (isRunning) {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        const formattedTimer = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        appElement.innerHTML += `
              <div>
              <div class="runningquize"> <div> <h1>Keep focused and try to answer the questions below</h1>
              <h2>${formattedTimer}</h2>
              <button class="btn-primary" onclick="handleFinishQuiz()">Finish Analysis</button> </div> </div>
                 
                  ${renderQuizContent()}
              </div>
          `;
    }

    if (showResults) {
        const percentage = (score / questions.length) * 100;
        appElement.innerHTML += `
              <div>
              <div class="result"> <div> <h1>Your emotional state is:</h1>  <h2>${percentage}% stressed</h2>  <p>You answered:  ${score} out of ${questions.length} questions correctly 🎉</p></div>
              
             
              </div>
              </div>
          `;
    }
}

function initialize() {
    questions = quizData;
    updateView();
}

initialize();