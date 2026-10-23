const questions = [
  {
    "question": "Which information should you avoid posting publicly?",
    "answers": [
      "A general interest in music",
      "Your passwords, one-time codes, or sensitive identity details",
      "A public link to an educational article",
      "A general question about computer safety"
    ],
    "correct": 1,
    "explanation": "Passwords, verification codes, and sensitive identity details can be abused for account takeover, fraud, or impersonation."
  },
  {
    "question": "A flashlight app requests access to your contacts and microphone without a clear reason. What should you do?",
    "answers": [
      "Grant every permission automatically",
      "Review whether the permissions are necessary and deny unjustified access",
      "Share your contacts with the app developer",
      "Disable all privacy settings on your phone"
    ],
    "correct": 1,
    "explanation": "Grant apps only the permissions they reasonably need. Review and revoke unnecessary permissions in your device settings."
  },
  {
    "question": "What is a good privacy practice when signing up for an online service?",
    "answers": [
      "Provide every personal detail requested, regardless of need",
      "Reuse another person's identity",
      "Check the service's privacy information and provide only necessary details",
      "Publish your registration details for convenience"
    ],
    "correct": 2,
    "explanation": "Understand how a service handles data and avoid providing unnecessary personal information."
  },
  {
    "question": "Why should you review social media privacy settings?",
    "answers": [
      "They guarantee that no one can copy your posts",
      "They help you control who can see information and interact with you",
      "They automatically remove all information from the internet",
      "They replace the need for strong passwords"
    ],
    "correct": 1,
    "explanation": "Privacy settings can limit visibility and contact, although they cannot guarantee that shared information will never be copied."
  },
  {
    "question": "You receive a message asking for your date of birth, home address, and bank details to claim an unexpected prize. What should you do?",
    "answers": [
      "Send everything quickly",
      "Share the details only after forwarding the message",
      "Treat the request as suspicious and verify it independently",
      "Provide the details if the message includes a company logo"
    ],
    "correct": 2,
    "explanation": "Unexpected requests for sensitive details may be attempts to steal personal information. Verify the offer through an independently obtained official channel."
  },
  {
    "question": "What should you do before selling or giving away a phone?",
    "answers": [
      "Leave your accounts signed in",
      "Back up needed data, sign out, and follow the manufacturer's secure reset instructions",
      "Share your screen lock code with the buyer",
      "Delete only the home screen shortcuts"
    ],
    "correct": 1,
    "explanation": "Back up important files, sign out of accounts where required, and perform the recommended factory reset to help protect personal data."
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
