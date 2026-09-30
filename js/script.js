document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     MOBILE NAVIGATION
  ========================= */

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );

      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
      });
    });
  }


  /* =========================
     PASSWORD SECURITY LAB
  ========================= */

  const passwordInput = document.getElementById("passwordInput");
  const analyzeButton = document.getElementById("analyzePassword");
  const passwordResult = document.getElementById("passwordResult");

  if (!passwordInput || !analyzeButton || !passwordResult) {
    return;
  }

  analyzeButton.addEventListener("click", analyzePassword);

  passwordInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      analyzePassword();
    }
  });


  function analyzePassword() {

    const value = passwordInput.value;

    if (!value) {
      passwordResult.innerHTML = `
        <div class="result-placeholder">
          Enter an example password first.
        </div>
      `;
      return;
    }

    const checks = {
      length: value.length >= 12,
      lowercase: /[a-z]/.test(value),
      uppercase: /[A-Z]/.test(value),
      number: /[0-9]/.test(value),
      symbol: /[^A-Za-z0-9]/.test(value),
      repeated: !/(.)\1\1/.test(value)
    };

    let score = 0;

    if (value.length >= 12) score++;
    if (value.length >= 16) score++;
    if (checks.lowercase && checks.uppercase) score++;
    if (checks.number) score++;
    if (checks.symbol) score++;
    if (checks.repeated) score++;

    let level;
    let levelClass;

    if (score <= 2) {
      level = "Needs improvement";
      levelClass = "status-bad";
    } else if (score <= 4) {
      level = "Getting stronger";
      levelClass = "status-warning";
    } else {
      level = "Strong characteristics";
      levelClass = "status-good";
    }

    const percentage = Math.round((score / 6) * 100);

    passwordResult.innerHTML = `
      <div class="analysis-header">
        <div>
          <div class="analysis-label">EDUCATIONAL ASSESSMENT</div>
          <div class="analysis-score ${levelClass}">
            ${level}
          </div>
        </div>

        <strong>${percentage}%</strong>
      </div>

      ${createCheckRow(
        "At least 12 characters",
        checks.length
      )}

      ${createCheckRow(
        "Uses lowercase letters",
        checks.lowercase
      )}

      ${createCheckRow(
        "Uses uppercase letters",
        checks.uppercase
      )}

      ${createCheckRow(
        "Uses numbers",
        checks.number
      )}

      ${createCheckRow(
        "Uses symbols",
        checks.symbol
      )}

      ${createCheckRow(
        "Avoids obvious repeated characters",
        checks.repeated
      )}

      <p style="
        margin: 18px 0 0;
        color: #667085;
        font-size: 12px;
      ">
        Remember: a password can satisfy these characteristics
        and still be unsafe if it is reused, predictable,
        or based on personal information.
      </p>
    `;
  }


  function createCheckRow(label, passed) {

    const status = passed
      ? `<span class="check-status status-good">✓ Good</span>`
      : `<span class="check-status status-warning">Needs attention</span>`;

    return `
      <div class="check-row">
        <span>${label}</span>
        ${status}
      </div>
    `;
  }

});
