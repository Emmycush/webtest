document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("safeUrlForm");
  const result = document.getElementById("safeUrlResult");

  if (!form || !result) return;

  const correctAnswers = [
    "domain",
    "https",
    "subdomain",
    "independent"
  ];

  const explanations = {
    domain: "The domain is one of the most important parts to inspect. Don't rely only on familiar-looking words in a URL.",
    https: "HTTPS encrypts the connection, but HTTPS by itself does not prove that a website is legitimate.",
    subdomain: "Subdomains appear before the main domain and can sometimes be used to make a deceptive address look convincing.",
    independent: "When a link seems suspicious, navigate to the organization's known website independently instead of trusting the link."
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const selected = Array.from(
      form.querySelectorAll('input[type="checkbox"]:checked')
    ).map((input) => input.value);

    let score = 0;
    let correctCount = 0;
    let incorrectCount = 0;

    selected.forEach((answer) => {
      if (correctAnswers.includes(answer)) {
        score++;
        correctCount++;
      } else {
        score--;
        incorrectCount++;
      }
    });

    score = Math.max(0, score);

    const maxScore = correctAnswers.length;

    let title = "";
    let message = "";

    if (score === maxScore && incorrectCount === 0) {
      title = "Excellent investigation! 🎯";
      message =
        "You identified the key URL safety checks. You are developing good habits for inspecting suspicious web addresses.";
    } else if (score >= 3) {
      title = "Good work! 🛡️";
      message =
        "You identified several important URL safety habits. Review the explanations below and try the challenge again if you want a perfect score.";
    } else if (score >= 1) {
      title = "Keep practicing. 🔎";
      message =
        "You spotted some useful clues, but there are important URL safety checks to review.";
    } else {
      title = "Let's investigate again. 🧠";
      message =
        "URL safety takes practice. Review the lessons below and try the challenge again.";
    }

    const explanationItems = correctAnswers
      .map((answer) => {
        const wasSelected = selected.includes(answer);
        const status = wasSelected ? "✓" : "!";
        return `
          <li>
            <strong>${status} ${answer === "https"
              ? "HTTPS"
              : answer.charAt(0).toUpperCase() + answer.slice(1)}</strong>
            <span>${explanations[answer]}</span>
          </li>
        `;
      })
      .join("");

    result.innerHTML = `
      <div class="result-card">
        <p class="result-score">Score: ${score}/${maxScore}</p>
        <h3>${title}</h3>
        <p>${message}</p>

        <div class="result-details">
          <h4>Why these checks matter</h4>
          <ul>
            ${explanationItems}
          </ul>
        </div>

        ${
          incorrectCount > 0
            ? `<p class="result-warning">
                You selected ${incorrectCount} option${incorrectCount === 1 ? "" : "s"} that should not be treated as a reliable safety signal.
              </p>`
            : ""
        }

        <button type="button" class="btn btn-secondary" id="retrySafeUrl">
          Try Again
        </button>
      </div>
    `;

    result.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });

    const retryButton = document.getElementById("retrySafeUrl");

    if (retryButton) {
      retryButton.addEventListener("click", () => {
        form.reset();
        result.innerHTML = "";
        form.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    }
  });
});
