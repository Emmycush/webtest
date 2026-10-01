const questions = [
  {
    question: "What should you do when an unexpected message creates a sense of urgency?",
    answers: [
      "Act immediately",
      "Forward it to everyone",
      "Pause and verify the claim",
      "Send your password"
    ],
    correct: 2
  },
  {
    question: "What is a safer way to visit an organization's website after receiving a suspicious link?",
    answers: [
      "Click the link repeatedly",
      "Type the known website address yourself",
      "Enter your password first",
      "Send the link to a stranger"
    ],
    correct: 1
  },
  {
    question: "Which request should be treated with particular caution?",
    answers: [
      "A request for a public business address",
      "A request for your private verification code",
      "A normal newsletter subscription",
      "A public product review"
    ],
    correct: 1
  },
  {
    question: "Which is a warning sign of a potentially fraudulent investment offer?",
    answers: [
      "A clear explanation of risks",
      "A regulated organization you independently verified",
      "A promise of guaranteed and unusually high returns",
      "A written investment agreement"
    ],
    correct: 2
  },
  {
    question: "What should you do before sending money because someone claims to be a friend or relative?",
    answers: [
      "Send it immediately",
      "Verify the request through another trusted method",
      "Post their message publicly",
      "Share your password first"
    ],
    correct: 1
  },
  {
    question: "What is an appropriate first step if you realize you interacted with a scam?",
    answers: [
      "Send the scammer more information",
      "Ignore all affected accounts",
      "Stop communicating and protect any exposed accounts",
      "Delete every account you own"
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
      "Excellent! You demonstrated strong scam-awareness knowledge.";
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
