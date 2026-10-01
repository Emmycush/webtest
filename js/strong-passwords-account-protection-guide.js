const questions = [
  {
    question: "What is one of the most important password security practices?",
    answers: [
      "Use the same password everywhere",
      "Use a unique password for each important account",
      "Use your birthday as your password",
      "Share your password with trusted friends"
    ],
    correct: 1,
    explanation: "Unique passwords help prevent one compromised account from putting your other accounts at risk."
  },
  {
    question: "Which characteristic can make a password stronger?",
    answers: [
      "Using predictable personal information",
      "Using a short common word",
      "Using a long, difficult-to-guess password",
      "Using your phone number"
    ],
    correct: 2,
    explanation: "Longer, difficult-to-guess passwords generally provide stronger protection."
  },
  {
    question: "What can a password manager help you do?",
    answers: [
      "Remove the need for passwords",
      "Generate and store unique passwords",
      "Guarantee that every account is secure",
      "Disable two-factor authentication"
    ],
    correct: 1,
    explanation: "A reputable password manager can help generate and securely store unique passwords for different accounts."
  },
  {
    question: "Why should you enable two-factor authentication?",
    answers: [
      "It makes passwords unnecessary",
      "It adds another verification step to help protect an account",
      "It prevents every type of cyberattack",
      "It lets you share your password safely"
    ],
    correct: 1,
    explanation: "Two-factor authentication adds another layer of protection if your password is compromised."
  },
  {
    question: "What should you do if a password has been exposed?",
    answers: [
      "Continue using it",
      "Post it online so others can verify it",
      "Change it and change it anywhere else it was reused",
      "Only change your username"
    ],
    correct: 2,
    explanation: "An exposed password should be replaced, including anywhere else the same password was reused."
  },
  {
    question: "Which information should you keep private?",
    answers: [
      "Your public profile name",
      "A private authentication or verification code",
      "A general cybersecurity tip",
      "The name of a public website"
    ],
    correct: 1,
    explanation: "Private authentication and verification codes should not be disclosed to unexpected people or services."
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const progress = document.getElementById("progress");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");

function showQuestion() {
  answered = false;

  const question = questions[currentQuestion];

  progress.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  questionElement.textContent = question.question;
  feedbackElement.textContent = "";
  nextButton.style.display = "none";

  answersElement.innerHTML = "";

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = answer;
    button.className = "quiz-answer";

    button.addEventListener("click", () => {
      selectAnswer(index);
    });

    answersElement.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  if (answered) {
    return;
  }

  answered = true;

  const question = questions[currentQuestion];
  const buttons = answersElement.querySelectorAll("button");

  buttons.forEach((button) => {
    button.disabled = true;
  });

  if (selectedIndex === question.correct) {
    score++;

    feedbackElement.textContent =
      `Correct! ${question.explanation}`;
  } else {
    feedbackElement.textContent =
      `Not quite. ${question.explanation}`;
  }

  if (currentQuestion < questions.length - 1) {
    nextButton.textContent = "Next Question";
  } else {
    nextButton.textContent = "See Results";
  }

  nextButton.style.display = "inline-block";
}

function showNextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionElement.style.display = "none";
  progress.style.display = "none";
  answersElement.style.display = "none";
  feedbackElement.style.display = "none";
  nextButton.style.display = "none";

  resultElement.style.display = "block";

  scoreElement.textContent =
    `Your score: ${score}/${questions.length}`;

  if (score === questions.length) {
    resultMessage.textContent =
      "Excellent! You demonstrated strong password security knowledge.";
  } else if (score >= 4) {
    resultMessage.textContent =
      "Great work! Review the questions you missed and keep practicing.";
  } else if (score >= 2) {
    resultMessage.textContent =
      "Good start. Review the password security guide and try again.";
  } else {
    resultMessage.textContent =
      "Keep learning. Review the guide and try the quiz again.";
  }
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;

  questionElement.style.display = "block";
  progress.style.display = "block";
  answersElement.style.display = "block";
  feedbackElement.style.display = "block";
  resultElement.style.display = "none";

  showQuestion();
}

nextButton.addEventListener("click", showNextQuestion);
restartButton.addEventListener("click", restartQuiz);

showQuestion();
