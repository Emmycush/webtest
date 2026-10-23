const questions = [
  {
    "question": "A website displays a browser security warning. What should you do?",
    "answers": [
      "Ignore it if the website looks professional",
      "Continue and enter your password",
      "Stop and investigate rather than bypassing the warning",
      "Disable browser security checks"
    ],
    "correct": 2,
    "explanation": "Browser warnings can indicate certificate, connection, or known threat problems. Do not bypass them casually."
  },
  {
    "question": "What does HTTPS tell you about a website?",
    "answers": [
      "The website is guaranteed to be honest",
      "The connection is encrypted, but the site itself may still be malicious",
      "The website cannot collect personal information",
      "Every download from the site is safe"
    ],
    "correct": 1,
    "explanation": "HTTPS protects data in transit, but scammers can also use HTTPS. Check the actual domain and the context of the request."
  },
  {
    "question": "A pop-up claims your device is infected and tells you to call a phone number immediately. What should you do?",
    "answers": [
      "Call immediately and follow every instruction",
      "Install the tool offered in the pop-up",
      "Avoid the number, close the page safely, and use trusted security tools if needed",
      "Provide your payment details to remove the warning"
    ],
    "correct": 2,
    "explanation": "Fake security alerts often pressure people into paying scammers or installing unwanted software. Use trusted security tools instead."
  },
  {
    "question": "Where should you normally obtain software?",
    "answers": [
      "From an unknown download mirror advertised in a pop-up",
      "From the official developer or a trusted app store",
      "From any site offering a free premium version",
      "From a random file-sharing message"
    ],
    "correct": 1,
    "explanation": "Official developer websites and trusted app stores reduce the risk of downloading tampered or unwanted software."
  },
  {
    "question": "A familiar brand's name appears in a strange-looking domain. What should you do?",
    "answers": [
      "Trust it because the logo looks correct",
      "Check the actual domain and navigate using a known official address",
      "Enter your password to test the website",
      "Assume every domain with HTTPS is authentic"
    ],
    "correct": 1,
    "explanation": "Lookalike domains can impersonate real services. Verify the hostname carefully and use a known official address when in doubt."
  },
  {
    "question": "A download starts unexpectedly while you browse. What is a safer response?",
    "answers": [
      "Open the file to see what it contains",
      "Disable your device's security protections",
      "Avoid opening it, remove it if appropriate, and review the site's permissions and behavior",
      "Forward the file to friends for testing"
    ],
    "correct": 2,
    "explanation": "Unexpected downloads can be unwanted or harmful. Do not open them, and review the source and browser permissions."
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
