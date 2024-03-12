const questions = [
  {
    question: "What do you do when your partner catches you cheating?",
    answers: [
      { text: "cry '😭", correct: false },
      { text: "lie'🤷‍♀️", correct: false },
      {
        text: "Say the Truth. Afterall Na cheat you cheat, you no kill person'👌",
        correct: true,
      },
      { text: "Gaslight them'😉", correct: false },
    ],
  },

  {
    question: "What do you say to your Partner's Parents at your wedding?",
    answers: [
      { text: "Thank you for raising such a wonderful person👏", correct: true },
      { text: "Hope this your pikin make sense sha🤷‍♀️", correct: false },
      {
        text: "Please don't come visiting'🏠",
        correct: false,
      },
      {
        text: "It is now my responsibility to repair the inner child you damaged🤞",
        correct: false,
      },
    ],
  },
  {
    question: "What do you do if your neighbour's child wants your food?",
    answers: [
      {
        text: "Say NO because you don't encourage bad behavior 😪",
        correct: false,
      },
      {
        text: "Don't give because the food sef will not bellefull you🥲",
        correct: false,
      },
      {
        text: "Report them to their mummy😒",
        correct: false,
      },
      {
        text: "Give them small because you are nice like that 😊",
        correct: true,
      },
    ],
  },
  {
    question: "How do you fight temptations?",
    answers: [
      {
        text: "Stand there and keep shouting 'stop! stop! we shouldn't be doing this''😱",
        correct: false,
      },
      { text: "Give In because you are only human'🤦‍♀️", correct: false },
      {
        text: "Share with your partner and have an escape plan'😁",
        correct: true,
      },
      {
        text: "Do it and blame the devil and your friends for influencing you'😉",
        correct: false,
      },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + "." + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
    if (
      window.confirm("Let me not believe you chose that on purpose! Try Again")
    ) {
      location.replace();
    }
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;

  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
