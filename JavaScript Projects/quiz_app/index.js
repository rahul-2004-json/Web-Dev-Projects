//Array of objects that contains the questions and the answers
const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "New York", correct: false },
      { text: "London", correct: false },
      { text: "Paris", correct: true },
      { text: "Dublin", correct: false },
    ],
  },

  {
    question: "What is the capital of India?",
    answers: [
      { text: "New Delhi", correct: true },
      { text: "Bejing", correct: false },
      { text: "Paris", correct: false },
      { text: "Spain", correct: false },
    ],
  },

  {
    question: "What is the currency of India?",
    answers: [
      { text: "Pounds", correct: false },
      { text: "Euros", correct: false },
      { text: "Bucks", correct: false },
      { text: "Rupee", correct: true },
    ],
  },

  {
    question: "Who is Prime Minister of India?",
    answers: [
      { text: "Rahul Gandhi", correct: false },
      { text: "Narendra Modi", correct: true },
      { text: "Jawaharlal Nehru", correct: false },
      { text: "Droupadi Murmur", correct: false },
    ],
  },
];

const questionelement = document.getElementById("question");
const answerButton = document.getElementById("answer-btns");
const nextButton = document.getElementById("next-btn");

//Every time the question changes and scores also
let currentQuestionIndex = 0;
let score = 0;

function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  setNextQuestion();
}

function setNextQuestion() {
  //resets previous questions and answers
  resetState();
  //displays the questions
  let currentquestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionelement.innerText = questionNo + ". " + currentquestion.question;

  //Code to display the answers
  currentquestion.answers.forEach((answers) => {
    const button = document.createElement("button");
    button.innerText = answers.text;
    button.classList.add("btn");
    //pushes the button created to div answer btns
    answerButton.appendChild(button);
    if (answers.correct) {
      //adds ture or false value to button dataset
      button.dataset.correct = answers.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  //removes all the previous answers
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectbtn = e.target;
  const iscorrect = selectbtn.dataset.correct === "true";
  if (iscorrect) {
    selectbtn.style.backgroundColor = "#9aeabc";
    score++;
  } else {
    selectbtn.style.backgroundColor = "#ff9393";
  }

  //   here it traverses all the btns after answer is selected wrong and marks green the correct answer
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.style.backgroundColor = "#9aeabc";
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionelement.innerText =
    "Your score is " + score + " out of " + questions.length;
  nextButton.innerHTML = "Restart";
  nextButton.style.display = "block";
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    setNextQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    // if no more questions left then restart the quiz
    startGame();
  }
});

startGame();
