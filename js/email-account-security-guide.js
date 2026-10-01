const questions = [
  {
    question: "Which practice helps protect an email account?",
    answers: [
      "Using the same password everywhere",
      "Using a long, unique password",
      "Sharing your password with friends",
      "Turning off security alerts"
    ],
    correct: 1
  },
  {
    question: "What does two-factor authentication add?",
    answers: [
      "A second verification step",
      "A second email address",
      "A longer username",
      "A public profile"
    ],
    correct: 0
  },
  {
    question: "What should you do with an unexpected email attachment?",
    answers: [
      "Open it immediately",
      "Forward it to everyone",
      "Verify it before opening",
      "Rename the file first"
    ],
    correct: 2
  },
  {
    question: "Which is a warning sign of phishing?",
    answers: [
      "A normal newsletter you subscribed to",
      "An urgent request for sensitive information",
      "A message from a known contact you expected",
      "A routine account notification"
    ],
    correct: 1
  },
  {
    question: "Should you share a verification code with someone who calls claiming to be support?",
    answers: [
      "Yes, if they know your name",
      "Yes, if they sound professional",
      "Only if they ask twice",
      "No, keep verification codes private"
    ],
    correct: 3
  },
  {
    question: "What should you do if you notice suspicious activity on your email account?",
    answers: [
      "Ignore it",
      "Post about it publicly",
      "Change your password and review account security",
      "Delete the email app"
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
const restartButton = document.getElementById("restart-btn");

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
      "Excellent! You demonstrated strong knowledge of email account security.";
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

