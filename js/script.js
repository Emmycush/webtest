document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      });
    });
  }

  const passwordInput = document.getElementById("passwordInput");
  const analyzePassword = document.getElementById("analyzePassword");
  const passwordResult = document.getElementById("passwordResult");

  if (passwordInput && analyzePassword && passwordResult) {
    analyzePassword.addEventListener("click", () => {
      const value = passwordInput.value;

      if (!value) {
        passwordResult.innerHTML = `
          <div class="result-placeholder">
            Enter a fictional example password first.
          </div>
        `;
        return;
      }

      const checks = [
        {
          label: "Length",
          passed: value.length >= 12,
          good: "The example is at least 12 characters long.",
          bad: "Longer passwords are generally harder to guess."
        },
        {
          label: "Uppercase",
          passed: /[A-Z]/.test(value),
          good: "It contains an uppercase letter.",
          bad: "Consider including uppercase characters when appropriate."
        },
        {
          label: "Lowercase",
          passed: /[a-z]/.test(value),
          good: "It contains a lowercase letter.",
          bad: "Consider including lowercase characters when appropriate."
        },
        {
          label: "Number",
          passed: /\d/.test(value),
          good: "It contains a number.",
          bad: "Adding numbers can increase character variety."
        },
        {
          label: "Symbol",
          passed: /[^A-Za-z0-9]/.test(value),
          good: "It contains a symbol.",
          bad: "A symbol can add additional character variety."
        },
        {
          label: "Common pattern",
          passed: !/^(password|123456|qwerty|admin|letmein)/i.test(value),
          good: "It does not begin with a commonly used password pattern.",
          bad: "Avoid common password words and predictable patterns."
        }
      ];

      const passed = checks.filter((check) => check.passed).length;
      const percentage = Math.round((passed / checks.length) * 100);

      let level = "Needs improvement";
      let levelClass = "warning";

      if (percentage >= 85) {
        level = "Strong example";
        levelClass = "success";
      } else if (percentage >= 65) {
        level = "Moderate example";
      }

      passwordResult.innerHTML = `
        <div>
          <strong>${level}</strong>
          <p>${passed}/${checks.length} security characteristics detected.</p>
        </div>

        <div class="password-checks">
          ${checks
            .map(
              (check) => `
                <div class="password-check">
                  <span>${check.passed ? "✓" : "!"}</span>
                  <div>
                    <strong>${check.label}</strong>
                    <p>${check.passed ? check.good : check.bad}</p>
                  </div>
                </div>
              `
            )
            .join("")}
        </div>

        <p class="analysis-disclaimer">
          Training result only. This does not measure whether a password
          is actually safe, unique, or suitable for a real account.
        </p>
      `;

      passwordResult.dataset.level = levelClass;
    });
  }
});

/* Two-Factor Authentication Demonstration */
document.querySelectorAll("#two-factor .demo-question").forEach((question) => {
  const correct = question.dataset.answer;
  const feedback = question.querySelector(".demo-feedback");
  const buttons = question.querySelectorAll(".demo-options button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => {
        item.classList.remove("selected", "correct", "incorrect");
        item.disabled = true;
      });

      const selected = button.dataset.option;
      button.classList.add("selected");

      if (selected === correct) {
        button.classList.add("correct");
        feedback.textContent =
          "Good choice. This practice adds protection against common account-security risks.";
      } else {
        button.classList.add("incorrect");

        const correctButton = question.querySelector(
          `.demo-options button[data-option="${correct}"]`
        );

        correctButton.classList.add("correct");
        feedback.textContent =
          "Review the highlighted safer option and consider why it provides stronger account protection.";
      }
    });
  });
});

/* Safe Browsing Demonstration */
document.querySelectorAll("#safe-browsing .demo-question").forEach((question) => {
  const correct = question.dataset.answer;
  const feedback = question.querySelector(".demo-feedback");
  const buttons = question.querySelectorAll(".demo-options button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => {
        item.classList.remove("selected", "correct", "incorrect");
        item.disabled = true;
      });

      const selected = button.dataset.option;
      button.classList.add("selected");

      if (selected === correct) {
        button.classList.add("correct");
        feedback.textContent =
          "Good choice. This habit helps reduce common risks when browsing online.";
      } else {
        button.classList.add("incorrect");

        const correctButton = question.querySelector(
          `.demo-options button[data-option="${correct}"]`
        );

        correctButton.classList.add("correct");
        feedback.textContent =
          "Review the highlighted safer option and consider why it reduces browsing risk.";
      }
    });
  });
});
