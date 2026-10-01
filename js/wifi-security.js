const questions = [
  {
    question: "Which Wi-Fi security option should you generally choose when your router supports it?",
    answers: [
      "No security",
      "WEP",
      "WPA2 or WPA3",
      "An open guest network for everything"
    ],
    correct: 2,
    explanation: "WPA2 and WPA3 provide stronger wireless security than older options such as WEP or an open network."
  },
  {
    question: "What should you do with your router's default administrator password?",
    answers: [
      "Keep it forever",
      "Change it to a strong, unique password",
      "Share it with visitors",
      "Use your Wi-Fi password as the administrator password"
    ],
    correct: 1,
    explanation: "Changing default administrator credentials helps reduce the risk of unauthorized access to your router settings."
  },
  {
    question: "You are at a café and see several Wi-Fi networks with similar names. What is the safest approach?",
    answers: [
      "Connect to the strongest signal without checking",
      "Choose a random network",
      "Confirm the legitimate network name with the venue",
      "Connect to all of them to compare speeds"
    ],
    correct: 2,
    explanation: "Attackers can create networks with names that resemble legitimate networks. Verify the correct network before connecting."
  },
  {
    question: "What is a good practice when using public Wi-Fi?",
    answers: [
      "Turn off device security",
      "Keep your device and browser updated",
      "Disable your screen lock",
      "Share sensitive information whenever requested"
    ],
    correct: 1,
    explanation: "Keeping your operating system, browser, and security software updated helps protect against known vulnerabilities."
  },
  {
    question: "What should you do when you finish using a public Wi-Fi network?",
    answers: [
      "Stay connected all day",
      "Share the network password publicly",
      "Disconnect from the network",
      "Save every nearby network"
    ],
    correct: 2,
    explanation: "Disconnecting when you are finished reduces unnecessary exposure to unfamiliar wireless networks."
  },
  {
    question: "Which action can improve the security of a home Wi-Fi network?",
    answers: [
      "Use a strong unique Wi-Fi password",
      "Use the router's default password",
      "Disable all router security",
      "Publish the Wi-Fi password online"
    ],
    correct: 0,
    explanation: "A strong, unique Wi-Fi password helps prevent unauthorized users from accessing your wireless network."
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
      "Excellent! You demonstrated a strong understanding of Wi-Fi security.";
  } else if (score >= 4) {
    resultMessage.textContent =
      "Good work! You understand many important wireless security practices.";
  } else if (score >= 2) {
    resultMessage.textContent =
      "Keep practicing. Review the lesson to strengthen your Wi-Fi security knowledge.";
  } else {
    resultMessage.textContent =
      "Review the lesson and try again. Learning safe wireless practices takes practice.";
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
