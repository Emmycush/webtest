document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("phishingForm");
  const result = document.getElementById("phishingResult");

  if (!form || !result) {
    return;
  }

  const correctAnswers = [
    "sender",
    "urgency",
    "credential",
    "link",
    "threat"
  ];

  form.addEventListener("submit", event => {
    event.preventDefault();

    const selected = Array.from(
      form.querySelectorAll('input[name="clue"]:checked')
    ).map(input => input.value);

    const incorrectSelections = selected.filter(
      answer => !correctAnswers.includes(answer)
    );

    const correctSelections = selected.filter(
      answer => correctAnswers.includes(answer)
    );

    const score = Math.max(
      0,
      correctSelections.length - incorrectSelections.length
    );

    const missedAnswers = correctAnswers.filter(
      answer => !selected.includes(answer)
    );

    const perfect = score === correctAnswers.length &&
      incorrectSelections.length === 0;

    let title;
    let message;

    if (perfect) {
      title = "Excellent investigation!";
      message =
        "You identified all of the important warning signs.";
    } else if (score >= 4 && incorrectSelections.length === 0) {
      title = "Good investigation!";
      message =
        "You identified most of the important warning signs. Review the missed clues below.";
    } else {
      title = "Keep investigating.";
      message =
        "Phishing detection improves when you slow down and examine several clues together.";
    }

    const explanations = {
      sender:
        "The sender uses a suspicious domain containing “micr0soft” and “support” rather than a verified Microsoft domain.",

      urgency:
        "The 24-hour deadline is designed to create pressure and discourage careful verification.",

      credential:
        "Unexpected requests to verify account information should be treated cautiously.",

      link:
        "Attackers often use buttons or links to direct victims toward fraudulent websites.",

      threat:
        "Threatening permanent account loss is a common pressure tactic."
    };

    const missedHTML = missedAnswers.length
      ? `
        <div class="feedback-block">
          <h3>Clues to review</h3>
          <ul>
            ${missedAnswers.map(answer => `
              <li>${explanations[answer]}</li>
            `).join("")}
          </ul>
        </div>
      `
      : "";

    const incorrectHTML = incorrectSelections.length
      ? `
        <div class="feedback-block feedback-warning">
          <h3>One selection to reconsider</h3>
          <p>
            The weather forecast is unrelated to the security warning
            signs in this fictional email.
          </p>
        </div>
      `
      : "";

    result.innerHTML = `
      <div class="result-success">
        <div class="analysis-header">
          <div>
            <div class="analysis-label">
              PHISHING DETECTIVE RESULT
            </div>

            <div class="analysis-score status-good">
              ${title}
            </div>
          </div>

          <strong>${score}/5</strong>
        </div>

        <p>${message}</p>

        <div class="feedback-block">
          <h3>What you should notice</h3>

          <ul>
            ${correctAnswers.map(answer => `
              <li>${explanations[answer]}</li>
            `).join("")}
          </ul>
        </div>

        ${missedHTML}
        ${incorrectHTML}

        <div class="feedback-block">
          <h3>Security habit</h3>
          <p>
            When an unexpected message creates urgency, stop.
            Verify the sender and destination independently before
            clicking links or providing information.
          </p>
        </div>
      </div>
    `;

    result.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });

  });

});
