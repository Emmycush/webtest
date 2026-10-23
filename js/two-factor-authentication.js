const questions = [
  {
    "question": "What does two-factor authentication (2FA) do?",
    "answers": [
      "Replaces every security measure on an account",
      "Adds another verification step beyond the password",
      "Makes an account impossible to compromise",
      "Shares your password with a trusted service"
    ],
    "correct": 1,
    "explanation": "2FA requires an additional verification factor. It improves security but does not make an account invulnerable."
  },
  {
    "question": "Which option is generally more resistant to phishing?",
    "answers": [
      "A password reused across several websites",
      "A verification code sent by an unexpected caller",
      "A properly configured passkey",
      "A code shared with someone claiming to be support"
    ],
    "correct": 2,
    "explanation": "Passkeys use cryptographic authentication and are designed to resist common phishing attacks when used correctly."
  },
  {
    "question": "Someone calling you as 'technical support' asks for your one-time verification code. What should you do?",
    "answers": [
      "Share it if they know your name",
      "Share only the first half",
      "Refuse and contact support through an official channel if needed",
      "Send the code by text message"
    ],
    "correct": 2,
    "explanation": "Never disclose verification codes to callers or message senders. A stolen code may let someone access your account."
  },
  {
    "question": "What is a sensible way to protect account recovery codes?",
    "answers": [
      "Post them in a private social media group",
      "Store them securely somewhere separate from the account",
      "Send them to strangers who offer account help",
      "Use the same recovery code for every website"
    ],
    "correct": 1,
    "explanation": "Recovery codes can help you regain access. Keep them private and in a secure location separate from your normal sign-in method."
  },
  {
    "question": "Your phone is lost, and it was used for account verification. What should you do?",
    "answers": [
      "Ignore the loss because 2FA handles everything",
      "Secure the phone account and use the service's official recovery process",
      "Give your password to someone who offers help",
      "Disable every security feature permanently"
    ],
    "correct": 1,
    "explanation": "Use official recovery procedures, contact your mobile provider when appropriate, and review active sessions and recovery settings."
  },
  {
    "question": "You receive an unexpected approval request in an authenticator app. You did not try to sign in. What is safest?",
    "answers": [
      "Approve it to stop the notifications",
      "Ignore the warning and share your password",
      "Deny the request and review the account through its official website or app",
      "Send a screenshot of the request to the caller"
    ],
    "correct": 2,
    "explanation": "Unexpected prompts may indicate someone is attempting to sign in. Deny them and investigate through an official channel."
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

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
  answered = false;
  const q = questions[currentQuestion];

  progress.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  question.textContent = q.question;
  answers.replaceChildren();
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
  if (answered) return;
  answered = true;

  const q = questions[currentQuestion];
  answers.querySelectorAll("button").forEach((button) => {
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
    resultMessage.textContent = "Excellent! You answered every question correctly.";
  } else if (score >= 4) {
    resultMessage.textContent = "Good work! Review any explanations that were new to you.";
  } else if (score >= 2) {
    resultMessage.textContent = "You're making progress. Review the explanations and try again.";
  } else {
    resultMessage.textContent = "Review the explanations, revisit the related lesson, and try again.";
  }
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  answered = false;
  result.hidden = true;
  quizContainer.hidden = false;
  showQuestion();
}

nextBtn.addEventListener("click", showNextQuestion);
restartBtn.addEventListener("click", restartQuiz);
showQuestion();
