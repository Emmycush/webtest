const questions = [
  {
    question: "What is a good practice for important online accounts?",
    answers: [
      "Use the same password everywhere",
      "Use a strong, unique password for each account",
      "Share your password with trusted friends",
      "Write your password in public"
    ],
    correct: 1,
    explanation: "Strong, unique passwords reduce the damage if one account is compromised."
  },
  {
    question: "What should you do with an unexpected email attachment?",
    answers: [
      "Open it immediately",
      "Forward it to everyone",
      "Verify the sender and context before opening it",
      "Disable your security software"
    ],
    correct: 2,
    explanation: "Unexpected attachments can contain malicious files. Verify the sender and context first."
  },
  {
    question: "Which action improves phone security?",
    answers: [
      "Disable screen locking",
      "Install apps from unknown websites",
      "Keep the operating system and apps updated",
      "Give every app unrestricted permissions"
    ],
    correct: 2,
    explanation: "Updates often contain security fixes that protect against known vulnerabilities."
  },
  {
    question: "Which statement about HTTPS is correct?",
    answers: [
      "HTTPS guarantees that a website is legitimate",
      "HTTPS means the website can never be hacked",
      "HTTPS helps encrypt the connection but does not prove the site is trustworthy",
      "HTTPS makes passwords unnecessary"
    ],
    correct: 2,
    explanation: "HTTPS protects the connection, but scammers can also operate websites using HTTPS."
  },
  {
    question: "Why are backups important?",
    answers: [
      "They make phishing impossible",
      "They can help recover important files after data loss or certain attacks",
      "They remove the need for software updates",
      "They prevent every type of malware"
    ],
    correct: 1,
    explanation: "Backups provide another copy of important information that can help with recovery after data loss."
  },
  {
    question: "What should you do if you suspect an account has been compromised?",
    answers: [
      "Ignore it",
      "Post your password online",
      "Change the password and review account activity",
      "Delete all your other accounts"
    ],
    correct: 2,
    explanation: "Changing the password and reviewing account activity can help secure the affected account and identify unauthorized access."
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

  progress.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  questionElement.textContent = question.question;
  feedbackElement.textContent = "";
  nextButton.style.display = "none";
  answersElement.innerHTML = "";

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = answer;
    button.className = "quiz-answer";
    button.addEventListener("click", () => selectAnswer(index));

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
    feedbackElement.textContent = `Correct! ${question.explanation}`;
  } else {
    feedbackElement.textContent =
      `Not quite. ${question.explanation}`;
  }

  if (currentQuestion < questions.length - 1) {
    nextButton.style.display = "inline-block";
  } else {
    nextButton.textContent = "See Results";
    nextButton.style.display = "inline-block";
  }
}

function showNextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    nextButton.textContent = "Next Question";
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
  scoreElement.textContent = `Your score: ${score}/${questions.length}`;

  if (score === questions.length) {
    resultMessage.textContent =
      "Excellent! You demonstrated strong understanding of practical cybersecurity safety habits.";
  } else if (score >= 4) {
    resultMessage.textContent =
      "Great work! Review the questions you missed and keep practicing.";
  } else if (score >= 2) {
    resultMessage.textContent =
      "Good start. Review the safety checklists and try the quiz again.";
  } else {
    resultMessage.textContent =
      "Keep learning. Review the safety checklists and try the quiz again.";
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
