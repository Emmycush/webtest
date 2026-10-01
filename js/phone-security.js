const questions = [
  {
    question: "Which is a good way to protect your smartphone from unauthorized access?",
    answers: [
      "Use an easy-to-guess PIN",
      "Use a strong PIN, password, or supported biometric lock",
      "Leave the phone unlocked",
      "Share your passcode with everyone"
    ],
    correct: 1,
    explanation: "A strong screen lock helps prevent unauthorized people from accessing your phone and the information stored on it."
  },
  {
    question: "Why are phone and app security updates important?",
    answers: [
      "They can fix known security vulnerabilities",
      "They make passwords unnecessary",
      "They remove the need for screen locks",
      "They automatically make every app trustworthy"
    ],
    correct: 0,
    explanation: "Security updates can address known vulnerabilities and improve protection against attacks."
  },
  {
    question: "Where should you normally download mobile applications?",
    answers: [
      "Random websites",
      "Unknown links in text messages",
      "Trusted official app stores",
      "Any website offering free downloads"
    ],
    correct: 2,
    explanation: "Official app stores provide additional security checks and reduce the risk of installing malicious or modified applications."
  },
  {
    question: "An unexpected text message asks you to click a link and enter your account password immediately. What should you do?",
    answers: [
      "Enter the password immediately",
      "Forward the message to everyone",
      "Treat it as suspicious and verify the request independently",
      "Reply with your security code"
    ],
    correct: 2,
    explanation: "Unexpected urgent requests for passwords or security codes are common phishing tactics. Verify the request through an official channel."
  },
  {
    question: "What should you do if an app requests access to information it does not reasonably need?",
    answers: [
      "Allow every permission automatically",
      "Review the permission and deny unnecessary access",
      "Give the app your account password",
      "Install several copies of the app"
    ],
    correct: 1,
    explanation: "Reviewing app permissions can reduce unnecessary access to information such as your location, contacts, camera, microphone, or files."
  },
  {
    question: "What is useful if your smartphone is lost or stolen?",
    answers: [
      "Disable all security features",
      "Use device-finding and remote-lock features",
      "Post your passwords publicly",
      "Ignore the situation"
    ],
    correct: 1,
    explanation: "Built-in device-finding and remote-lock features can help you locate, secure, or manage a lost device."
  }
];

let currentQuestion = 0;
let score = 0;

const progress = document.getElementById("progress");
const question = document.getElementById("question");
const answers = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");

const quizContainer = document.getElementById("quiz-container");
const result = document.getElementById("result");
const scoreText = document.getElementById("score");
const resultMessage = document.getElementById("result-message");
const restartBtn = document.getElementById("restart-btn");

function showQuestion() {
  const q = questions[currentQuestion];

  progress.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  question.textContent = q.question;

  answers.innerHTML = "";
  feedback.textContent = "";
  nextBtn.hidden = true;

  q.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = answer;
    button.addEventListener("click", () => selectAnswer(index));

    answers.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  const q = questions[currentQuestion];
  const buttons = answers.querySelectorAll("button");

  buttons.forEach((button) => {
    button.disabled = true;
  });

  if (selectedIndex === q.correct) {
    score++;
    feedback.textContent = `Correct! ${q.explanation}`;
  } else {
    feedback.textContent = `Not quite. ${q.explanation}`;
  }

  nextBtn.hidden = false;
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
  quizContainer.hidden = true;
  result.hidden = false;

  scoreText.textContent = `Score: ${score}/${questions.length}`;

  if (score === questions.length) {
    resultMessage.textContent =
      "Excellent! You demonstrated a strong understanding of phone security.";
  } else if (score >= 4) {
    resultMessage.textContent =
      "Good work! You understand many important smartphone security practices.";
  } else if (score >= 2) {
    resultMessage.textContent =
      "Keep practicing. Review the lesson to strengthen your phone security knowledge.";
  } else {
    resultMessage.textContent =
      "Review the lesson and try again. Strong phone security starts with simple habits.";
  }
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;

  result.hidden = true;
  quizContainer.hidden = false;

  showQuestion();
}

nextBtn.addEventListener("click", showNextQuestion);
restartBtn.addEventListener("click", restartQuiz);

showQuestion();
