const questions = [
  {
    question: "You receive a call from someone claiming to be IT support. They say your account will be disabled unless you give them your password immediately. What should you do?",
    answers: [
      "Give them the password to prevent the account from being disabled",
      "Verify the request through an official IT support channel",
      "Ask them to send you a different password",
      "Ignore all future IT support messages"
    ],
    correct: 1,
    explanation: "Urgency and requests for passwords are common social engineering warning signs. Verify unexpected requests through an official channel."
  },
  {
    question: "Someone wearing an employee badge asks you to hold open a secure office door because they forgot their access card. What technique could this represent?",
    answers: [
      "Baiting",
      "Tailgating",
      "Malware",
      "Encryption"
    ],
    correct: 1,
    explanation: "Tailgating occurs when someone gains access to a restricted area by following or being allowed in behind an authorized person."
  },
  {
    question: "A stranger offers you a free USB drive and tells you to plug it into your computer to see what is on it. What should you do?",
    answers: [
      "Plug it in immediately",
      "Give it to a friend to test",
      "Avoid using it and report or safely dispose of it according to local policy",
      "Use it only if the USB looks new"
    ],
    correct: 2,
    explanation: "Unknown USB devices can contain malicious software. Avoid connecting untrusted devices to your computer."
  },
  {
    question: "An attacker pretends to be a bank employee and asks you to confirm personal information. What social engineering method is being used?",
    answers: [
      "Impersonation",
      "Tailgating",
      "Backups",
      "Encryption"
    ],
    correct: 0,
    explanation: "Impersonation involves pretending to be a trusted person or organization to gain information or access."
  },
  {
    question: "A message claims you have won an expensive prize but asks you to provide sensitive information before receiving it. What should you do?",
    answers: [
      "Provide the information quickly",
      "Share the message with everyone",
      "Treat it as suspicious and verify the claim independently",
      "Reply with your account password"
    ],
    correct: 2,
    explanation: "Unexpected prizes and requests for sensitive information are common manipulation tactics. Verify claims independently before taking action."
  },
  {
    question: "Which behavior can help protect you from social engineering attacks?",
    answers: [
      "Acting immediately whenever a message creates fear",
      "Trusting anyone who claims to be an employee",
      "Verifying unexpected requests before sharing information or taking action",
      "Using the same password for every account"
    ],
    correct: 2,
    explanation: "Pause and verify unexpected requests. Attackers often rely on urgency, fear, curiosity, authority, or trust."
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
      "Excellent! You demonstrated a strong understanding of social engineering risks.";
  } else if (score >= 4) {
    resultMessage.textContent =
      "Good work! You understand many common social engineering techniques.";
  } else if (score >= 2) {
    resultMessage.textContent =
      "Keep practicing. Learning to recognize manipulation tactics can help protect you online.";
  } else {
    resultMessage.textContent =
      "Review the lesson and try again. Recognizing social engineering warning signs takes practice.";
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
