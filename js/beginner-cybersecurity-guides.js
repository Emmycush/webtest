const questions = [
  {
    question: "What is cybersecurity mainly about?",
    answers: [
      "Making websites look attractive",
      "Protecting systems, devices, accounts, networks, and information",
      "Increasing internet speed",
      "Creating social media posts"
    ],
    correct: 1,
    explanation: "Cybersecurity focuses on protecting digital systems, devices, accounts, networks, and information from unauthorized access, misuse, damage, or disruption."
  },
  {
    question: "What is a good password practice?",
    answers: [
      "Use the same password everywhere",
      "Use your birthday",
      "Use strong and unique passwords",
      "Share your password with friends"
    ],
    correct: 2,
    explanation: "Strong, unique passwords help reduce the impact of a compromised account."
  },
  {
    question: "What is phishing?",
    answers: [
      "A type of computer hardware",
      "A deceptive attempt to trick someone into revealing information or taking an unsafe action",
      "A method for improving Wi-Fi speed",
      "A legitimate software update"
    ],
    correct: 1,
    explanation: "Phishing uses deceptive messages, websites, or other methods to trick people into giving up information or performing unsafe actions."
  },
  {
    question: "Which action can help reduce malware risk?",
    answers: [
      "Download software from unknown websites",
      "Install pirated applications",
      "Open every unexpected attachment",
      "Download software from trusted sources"
    ],
    correct: 3,
    explanation: "Using trusted software sources and avoiding suspicious files can reduce exposure to malicious software."
  },
  {
    question: "Does HTTPS by itself prove that a website is legitimate?",
    answers: [
      "Yes, always",
      "No",
      "Only on mobile phones",
      "Only when the website has images"
    ],
    correct: 1,
    explanation: "HTTPS helps protect data in transit, but it does not guarantee that the website itself is trustworthy."
  },
  {
    question: "Why are backups useful?",
    answers: [
      "They increase screen brightness",
      "They can help recover important files after loss or damage",
      "They remove the need for passwords",
      "They prevent every cyberattack"
    ],
    correct: 1,
    explanation: "Backups can help recover important information after accidental deletion, device failure, loss, or certain malware incidents."
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
    feedbackElement.textContent = `Not quite. ${current.explanation}`;
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
      "Excellent! You have a strong understanding of the cybersecurity fundamentals.";
  } else if (percentage >= 70) {
    resultMessage.textContent =
      "Good job! Keep building your cybersecurity knowledge.";
  } else if (percentage >= 50) {
    resultMessage.textContent =
      "Good start. Review the guides and try the quiz again.";
  } else {
    resultMessage.textContent =
      "Keep learning. Review the beginner guides and try again.";
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

