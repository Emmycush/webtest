const questions = [
  {
    question: "What should you change from the default when setting up a router?",
    answers: [
      "The router's administrator credentials",
      "The internet itself",
      "Every device's screen size",
      "The browser homepage"
    ],
    correct: 0
  },
  {
    question: "Which wireless security option should generally be preferred when supported?",
    answers: [
      "An obsolete encryption method",
      "WPA3",
      "No password",
      "An open network"
    ],
    correct: 1
  },
  {
    question: "What makes a Wi-Fi password stronger?",
    answers: [
      "Using a short common word",
      "Using your phone number",
      "Using a long, unique password",
      "Using your address"
    ],
    correct: 2
  },
  {
    question: "Why should router firmware be updated?",
    answers: [
      "Updates can fix security vulnerabilities",
      "Updates remove the Wi-Fi password",
      "Updates make passwords public",
      "Updates disable all connected devices"
    ],
    correct: 0
  },
  {
    question: "What is one purpose of a guest Wi-Fi network?",
    answers: [
      "To expose your private devices",
      "To give visitors a separate network for internet access",
      "To disable router security",
      "To replace all router updates"
    ],
    correct: 1
  },
  {
    question: "What should you do if you notice an unfamiliar device connected to your network?",
    answers: [
      "Ignore it automatically",
      "Immediately destroy the router",
      "Investigate it and determine whether it is authorized",
      "Share your Wi-Fi password publicly"
    ],
    correct: 2
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const progress = document.getElementById("progress");
const question = document.getElementById("question");
const answers = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const result = document.getElementById("result");
const scoreDisplay = document.getElementById("score");
const resultMessage = document.getElementById("result-message");

function showQuestion() {
  answered = false;

  const current = questions[currentQuestion];

  progress.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  question.textContent = current.question;

  answers.innerHTML = "";
  feedback.textContent = "";
  nextButton.style.display = "none";

  current.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = answer;
    button.className = "quiz-answer";

    button.addEventListener("click", () => {
      selectAnswer(index);
    });

    answers.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  if (answered) {
    return;
  }

  answered = true;

  const current = questions[currentQuestion];
  const buttons = answers.querySelectorAll("button");

  buttons.forEach((button) => {
    button.disabled = true;
  });

  if (selectedIndex === current.correct) {
    score++;
    feedback.textContent = "Correct! Good job.";
  } else {
    feedback.textContent =
      `Not quite. The correct answer is: ${current.answers[current.correct]}`;
  }

  nextButton.style.display = "inline-block";

  if (currentQuestion === questions.length - 1) {
    nextButton.textContent = "See Results";
  }
}

function showNextQuestion() {
  if (!answered) {
    return;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  question.style.display = "none";
  progress.style.display = "none";
  answers.style.display = "none";
  feedback.style.display = "none";
  nextButton.style.display = "none";

  result.style.display = "block";
  scoreDisplay.textContent = score;

  if (score === questions.length) {
    resultMessage.textContent =
      "Excellent! You demonstrated strong Wi-Fi security knowledge.";
  } else if (score >= 4) {
    resultMessage.textContent =
      "Good work! Review the guide once more to strengthen your knowledge.";
  } else {
    resultMessage.textContent =
      "Keep learning. Review the guide and try the quiz again.";
  }
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  answered = false;

  question.style.display = "block";
  progress.style.display = "block";
  answers.style.display = "block";
  feedback.style.display = "block";
  result.style.display = "none";

  nextButton.textContent = "Next Question";

  showQuestion();
}

showQuestion();

