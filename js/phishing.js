const questions = [
  {
    question: "You receive an unexpected message saying your account will be closed today unless you click a link. What is the safest response?",
    answers: [
      "Click the link immediately",
      "Reply with your password",
      "Verify the message through the official service before taking action",
      "Forward it to everyone you know"
    ],
    correct: 2,
    explanation: "Urgency is a common phishing tactic. Verify unexpected account warnings through an official website or trusted contact method."
  },

  {
    question: "Which is a common warning sign of a phishing message?",
    answers: [
      "An unexpected request for sensitive information",
      "A message you were expecting from a known contact",
      "A normal newsletter you subscribed to",
      "A receipt for a purchase you made"
    ],
    correct: 0,
    explanation: "Unexpected requests for passwords, payment information, or security codes can be warning signs of phishing."
  },

  {
    question: "What should you do if an unexpected message contains a suspicious attachment?",
    answers: [
      "Open it to see what it contains",
      "Download it on your phone first",
      "Ignore the warning and open it",
      "Avoid opening it and verify the message independently"
    ],
    correct: 3,
    explanation: "Unexpected attachments can contain malicious content. Verify the sender and message before opening anything."
  },

  {
    question: "What is smishing?",
    answers: [
      "Phishing through text messages",
      "Phishing through phone calls",
      "A type of computer hardware",
      "A method of encrypting files"
    ],
    correct: 0,
    explanation: "Smishing is phishing conducted through SMS or other text messaging services."
  },

  {
    question: "A website asks for your password after you clicked a link in an unexpected email. What should you do?",
    answers: [
      "Enter the password quickly",
      "Use the same password everywhere",
      "Leave the page and access the service through its official website or app",
      "Send the password to the sender"
    ],
    correct: 2,
    explanation: "Instead of using an unexpected login link, access the service directly through its official website or application."
  },

  {
    question: "Which action can help protect your accounts if your password is exposed?",
    answers: [
      "Use the same password everywhere",
      "Enable multi-factor authentication",
      "Share your password with a friend",
      "Disable security notifications"
    ],
    correct: 1,
    explanation: "Multi-factor authentication provides an additional layer of protection beyond your password."
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
const scoreDisplay = document.getElementById("score");
const resultMessage = document.getElementById("result-message");
const restartBtn = document.getElementById("restart-btn");

function showQuestion() {
  answered = false;

  const item = questions[currentQuestion];

  progress.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  question.textContent = item.question;

  answers.innerHTML = "";
  feedback.textContent = "";
  nextBtn.hidden = true;

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = answer;

    button.addEventListener("click", () => {
      checkAnswer(index);
    });

    answers.appendChild(button);
  });
}

function checkAnswer(selected) {
  if (answered) return;

  answered = true;

  const item = questions[currentQuestion];
  const buttons = answers.querySelectorAll("button");

  buttons.forEach((button) => {
    button.disabled = true;
  });

  if (selected === item.correct) {
    score++;
    feedback.textContent =
      `Correct! ${item.explanation}`;
  } else {
    feedback.textContent =
      `Not quite. ${item.explanation}`;
  }

  if (currentQuestion < questions.length - 1) {
    nextBtn.hidden = false;
  } else {
    nextBtn.textContent = "View Results";
    nextBtn.hidden = false;
  }
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  quizContainer.hidden = true;
  result.hidden = false;

  scoreDisplay.textContent =
    `Your score: ${score}/${questions.length}`;

  if (score === questions.length) {
    resultMessage.textContent =
      "Excellent! You identified all of the phishing awareness questions correctly.";
  } else if (score >= questions.length / 2) {
    resultMessage.textContent =
      "Good work! Review the explanations and keep practicing.";
  } else {
    resultMessage.textContent =
      "Keep learning. Review the phishing lesson and try the practice again.";
  }
}

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;

  result.hidden = true;
  quizContainer.hidden = false;

  showQuestion();
});

showQuestion();

