const questions = [
  {
    question: "What is a good way to protect your email account?",
    answers: [
      "Reuse the same password everywhere",
      "Use a strong, unique password",
      "Share your password with friends",
      "Use your birthday as the password"
    ],
    correct: 1,
    explanation: "A strong, unique password reduces the risk that a compromise of another service will expose your email account."
  },
  {
    question: "What additional security feature should you enable on your email account when available?",
    answers: [
      "Automatic password sharing",
      "Two-factor authentication",
      "Public account access",
      "Password reuse"
    ],
    correct: 1,
    explanation: "Two-factor authentication adds another verification step and can help protect an account even if its password is compromised."
  },
  {
    question: "An unexpected email asks you to click a link and confirm your password immediately. What should you do?",
    answers: [
      "Enter the password immediately",
      "Forward it to everyone",
      "Treat it as suspicious and verify the request independently",
      "Reply with your security code"
    ],
    correct: 2,
    explanation: "Urgent requests for passwords or security codes are common phishing warning signs. Verify the request through an official channel."
  },
  {
    question: "Which detail should you check when you receive a suspicious email?",
    answers: [
      "Only the logo",
      "The sender's email address",
      "How colorful the message is",
      "The number of images"
    ],
    correct: 1,
    explanation: "Checking the sender address can help identify messages that are pretending to come from a trusted person or organization."
  },
  {
    question: "You receive an unexpected attachment from someone you know. What is the safest approach?",
    answers: [
      "Open it immediately because you know the sender",
      "Verify that the attachment was actually sent by the person",
      "Forward it to another person",
      "Disable your security software first"
    ],
    correct: 1,
    explanation: "A known person's account could have been compromised. Verify unexpected attachments before opening them."
  },
  {
    question: "Which action can help protect your email account from unauthorized access?",
    answers: [
      "Ignore unfamiliar login activity",
      "Review account activity and recovery options",
      "Use the same password on every website",
      "Disable all security features"
    ],
    correct: 1,
    explanation: "Reviewing account activity and recovery options can help you identify suspicious access and maintain control of your account."
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
      "Excellent! You demonstrated a strong understanding of email security.";
  } else if (score >= 4) {
    resultMessage.textContent =
      "Good work! You understand many important email security practices.";
  } else if (score >= 2) {
    resultMessage.textContent =
      "Keep practicing. Review the lesson to strengthen your email security knowledge.";
  } else {
    resultMessage.textContent =
      "Review the lesson and try again. Careful email habits can help prevent account compromise.";
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

