const questions = [
  {
    question: "What is phishing?",
    answers: [
      "A method for improving Wi-Fi speed",
      "An attempt to trick someone into revealing information or taking an unsafe action",
      "A type of computer backup",
      "A legitimate software update"
    ],
    correct: 1,
    explanation: "Phishing uses deceptive messages or websites to trick people into revealing information or performing unsafe actions."
  },
  {
    question: "Which is a common phishing warning sign?",
    answers: [
      "An unexpected message creating urgency",
      "A routine software update from a trusted source",
      "A password you created yourself",
      "A file you expected from a colleague"
    ],
    correct: 0,
    explanation: "Unexpected urgent requests are commonly used to pressure people into acting before they verify the situation."
  },
  {
    question: "What should you do before clicking a suspicious link?",
    answers: [
      "Click it quickly before it expires",
      "Forward it to your contacts",
      "Verify the sender and destination first",
      "Enter your password to check the website"
    ],
    correct: 2,
    explanation: "Verify the sender and destination before following a suspicious link."
  },
  {
    question: "Does HTTPS prove that a website is legitimate?",
    answers: [
      "Yes, every HTTPS website is safe",
      "Yes, HTTPS prevents phishing",
      "No, phishing websites can also use HTTPS",
      "Only when the website asks for a password"
    ],
    correct: 2,
    explanation: "HTTPS helps protect the connection, but it does not prove that the website itself is legitimate."
  },
  {
    question: "What is a safer way to verify an unexpected account message?",
    answers: [
      "Use the link provided in the message",
      "Contact the organization through a trusted official channel",
      "Reply with your password",
      "Ignore all account notifications forever"
    ],
    correct: 1,
    explanation: "Using a trusted official website, app, or contact method avoids relying on potentially malicious links in the message."
  },
  {
    question: "What should you do if you entered your password into a suspected phishing website?",
    answers: [
      "Do nothing",
      "Share the password with someone else",
      "Change the password from the legitimate service and review account activity",
      "Delete your device immediately"
    ],
    correct: 2,
    explanation: "Change the compromised password through the legitimate service, enable two-factor authentication if available, and review account activity."
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
      "Excellent! You demonstrated strong phishing awareness.";
  } else if (score >= 4) {
    resultMessage.textContent =
      "Great work! Review the questions you missed and keep practicing.";
  } else if (score >= 2) {
    resultMessage.textContent =
      "Good start. Review the phishing guide and try the quiz again.";
  } else {
    resultMessage.textContent =
      "Keep learning. Review the phishing guide and try the quiz again.";
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
