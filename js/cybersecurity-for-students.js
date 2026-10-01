const questions = [
  {
    question: "What is the best approach to passwords for important student accounts?",
    answers: [
      "Use the same password everywhere",
      "Use strong, unique passwords",
      "Share your password with trusted classmates",
      "Use your birthday as your password"
    ],
    correct: 1,
    explanation: "Strong, unique passwords reduce the risk of one compromised account affecting your other accounts."
  },
  {
    question: "What does two-factor authentication provide?",
    answers: [
      "An additional layer of account protection",
      "Free internet access",
      "Automatic antivirus protection",
      "A way to avoid using passwords"
    ],
    correct: 0,
    explanation: "Two-factor authentication requires an additional verification method beyond your password."
  },
  {
    question: "You receive an urgent message asking for your school password. What should you do?",
    answers: [
      "Send the password immediately",
      "Post the password in the class group",
      "Verify the request through a trusted channel",
      "Forward the message to everyone"
    ],
    correct: 2,
    explanation: "Unexpected password requests can be phishing attempts. Verify them through an official and trusted channel."
  },
  {
    question: "Which is a safer practice when using public Wi-Fi?",
    answers: [
      "Connect to any network with a strong signal",
      "Share sensitive information with strangers",
      "Verify the network and use secure websites",
      "Turn off all device security"
    ],
    correct: 2,
    explanation: "Verify the network before connecting and use secure HTTPS websites. Avoid sensitive activity on networks you do not trust."
  },
  {
    question: "Why should students keep their devices and applications updated?",
    answers: [
      "Updates can include security fixes",
      "Updates always make devices faster",
      "Updates remove the need for passwords",
      "Updates prevent every possible cyberattack"
    ],
    correct: 0,
    explanation: "Updates often include security patches that fix known vulnerabilities."
  },
  {
    question: "What is a good way to protect important school files?",
    answers: [
      "Keep the only copy on a public computer",
      "Back up important files",
      "Share every file publicly",
      "Delete files after every class"
    ],
    correct: 1,
    explanation: "Backups can help you recover important schoolwork if your device is lost, damaged, infected, or compromised."
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
const resultSection = document.getElementById("result");
const quizContainer = document.querySelector(".quiz-container");
const scoreElement = document.getElementById("score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");

function showQuestion() {
  answered = false;

  const current = questions[currentQuestion];

  progress.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  questionElement.textContent = current.question;

  answersElement.innerHTML = "";
  feedbackElement.textContent = "";
  nextButton.style.display = "none";

  current.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.textContent = answer;
    button.className = "quiz-answer";
    button.type = "button";

    button.addEventListener("click", () => {
      selectAnswer(index);
    });

    answersElement.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  if (answered) return;

  answered = true;

  const current = questions[currentQuestion];
  const buttons = answersElement.querySelectorAll("button");

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === current.correct) {
      button.classList.add("correct");
    }

    if (index === selectedIndex && index !== current.correct) {
      button.classList.add("incorrect");
    }
  });

  if (selectedIndex === current.correct) {
    score++;
    feedbackElement.textContent = `Correct! ${current.explanation}`;
  } else {
    feedbackElement.textContent =
      `Not quite. ${current.explanation}`;
  }

  nextButton.textContent =
    currentQuestion === questions.length - 1
      ? "See Results"
      : "Next Question";

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
  quizContainer.style.display = "none";
  resultSection.style.display = "block";

  scoreElement.textContent =
    `Your score: ${score}/${questions.length}`;

  const percentage = (score / questions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent =
      "Excellent! You demonstrated strong cybersecurity awareness.";
  } else if (percentage >= 70) {
    resultMessage.textContent =
      "Good job! Keep building your cybersecurity knowledge.";
  } else if (percentage >= 50) {
    resultMessage.textContent =
      "Good start. Review the lessons and try the quiz again.";
  } else {
    resultMessage.textContent =
      "Keep learning. Review the lesson and try again.";
  }
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;

  resultSection.style.display = "none";
  quizContainer.style.display = "block";

  showQuestion();
}

nextButton.addEventListener("click", showNextQuestion);
restartButton.addEventListener("click", restartQuiz);

showQuestion();
