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

/* Malware Demonstration */
document.querySelectorAll("#malware-demo .demo-question").forEach((question) => {
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
          "Good choice. This response helps reduce the risk of further malware-related harm.";
      } else {
        button.classList.add("incorrect");

        const correctButton = question.querySelector(
          `.demo-options button[data-option="${correct}"]`
        );

        correctButton.classList.add("correct");
        feedback.textContent =
          "Review the highlighted safer response and consider why it reduces malware-related risk.";
      }
    });
  });
});

/* Social Engineering Demonstration */
document.querySelectorAll("#social-engineering-demo .demo-question").forEach((question) => {
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
          "Good choice. Pausing and verifying unexpected requests helps reduce social engineering risk.";
      } else {
        button.classList.add("incorrect");

        const correctButton = question.querySelector(
          `.demo-options button[data-option="${correct}"]`
        );

        correctButton.classList.add("correct");
        feedback.textContent =
          "Review the highlighted safer response and consider how it reduces manipulation risk.";
      }
    });
  });
});

/* Site-wide search */

const searchToggle = document.getElementById("searchToggle");
const siteSearch = document.getElementById("site-search");
const siteSearchInput = document.getElementById("siteSearchInput");
const siteSearchClose = document.getElementById("siteSearchClose");
const siteSearchResults = document.getElementById("siteSearchResults");

const searchIndex = [
  {
    title: "CyberSafe Academy",
    url: "index.html",
    description: "Learn cybersecurity through practical lessons, demonstrations, challenges, and safety guidance.",
    keywords: "cybersecurity academy learn practice protect security"
  },
  {
    title: "Beginner Cybersecurity Guides",
    url: "beginner-cybersecurity-guides.html",
    description: "Beginner-friendly cybersecurity guides covering essential online safety concepts.",
    keywords: "beginner cybersecurity basics guides online safety"
  },
  {
    title: "Cybersecurity for Students",
    url: "cybersecurity-for-students.html",
    description: "Practical cybersecurity guidance for students, campus life, accounts, devices, and online learning.",
    keywords: "students university school campus education accounts devices"
  },
  {
    title: "How to Secure Your Email Account",
    url: "email-account-security-guide.html",
    description: "Learn practical steps to protect your email account and reduce account security risks.",
    keywords: "email account security password 2fa authentication"
  },
  {
    title: "Email Security",
    url: "email-security.html",
    description: "Learn how to protect email accounts, recognize suspicious messages, avoid phishing, and keep email communications secure.",
    keywords: "email phishing suspicious messages scams attachments account"
  },
  {
    title: "Malware",
    url: "malware.html",
    description: "Learn what malware is, common types of malware, warning signs, and practical ways to protect your devices.",
    keywords: "malware virus ransomware spyware trojan device infection"
  },
  {
    title: "How to Recognize and Avoid Online Scams",
    url: "online-scams-awareness-guide.html",
    description: "Learn how to recognize common online scams and protect yourself from fraudulent requests.",
    keywords: "scams fraud fake messages money social engineering online"
  },
  {
    title: "How to Recognize a Phishing Attack",
    url: "phishing-attack-beginners-guide.html",
    description: "A beginner's guide to recognizing phishing attacks, suspicious messages, and fake login pages.",
    keywords: "phishing attacks fake login email links credentials scams"
  },
  {
    title: "Phishing",
    url: "phishing.html",
    description: "Learn how to recognize phishing attacks, suspicious messages, fake login pages, and other common online scams.",
    keywords: "phishing email fake login suspicious links messages"
  },
  {
    title: "Phone Security",
    url: "phone-security.html",
    description: "Learn practical phone security practices to protect your smartphone, accounts, personal information, and apps.",
    keywords: "phone smartphone mobile security apps privacy device"
  },
  {
    title: "Practical Cybersecurity Safety Checklists",
    url: "practical-safety-checklists.html",
    description: "Use practical cybersecurity checklists to review and improve your everyday security habits.",
    keywords: "checklist safety audit security habits accounts devices"
  },
  {
    title: "Social Engineering",
    url: "social-engineering.html",
    description: "Learn how social engineering attacks manipulate people and how to recognize and prevent common techniques.",
    keywords: "social engineering manipulation impersonation pretexting baiting tailgating"
  },
  {
    title: "How to Create Strong Passwords and Protect Your Online Accounts",
    url: "strong-passwords-account-protection-guide.html",
    description: "Learn how to create stronger passwords and improve protection for your online accounts.",
    keywords: "password strong passwords accounts authentication security"
  },
  {
    title: "How to Secure Your Wi-Fi Network",
    url: "wifi-network-security-guide.html",
    description: "Learn practical ways to secure your Wi-Fi network and reduce wireless security risks.",
    keywords: "wifi wireless router network security password encryption"
  },
  {
    title: "Wi-Fi Security",
    url: "wifi-security.html",
    description: "Learn how to secure your Wi-Fi network, recognize unsafe wireless networks, and protect devices on public Wi-Fi.",
    keywords: "wifi public wifi wireless network router hotspot security"
  }
];

function renderSearchResults(query) {
  if (!siteSearchResults) return;

  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    siteSearchResults.innerHTML = "";
    return;
  }

  const terms = normalizedQuery.split(/\s+/).filter(Boolean);

  const matches = searchIndex.filter((item) => {
    const searchableText = [
      item.title,
      item.description,
      item.keywords
    ].join(" ").toLowerCase();

    return terms.every((term) => searchableText.includes(term));
  });

  if (!matches.length) {
    siteSearchResults.innerHTML =
      '<p class="search-empty">No matching lessons or resources found.</p>';
    return;
  }

  siteSearchResults.innerHTML = matches.map((item) => `
    <a class="search-result" href="${item.url}">
      <strong>${item.title}</strong>
      <span>${item.description}</span>
    </a>
  `).join("");
}

function openSiteSearch() {
  if (!siteSearch || !siteSearchInput) return;

  siteSearch.hidden = false;
  searchToggle?.setAttribute("aria-expanded", "true");
  siteSearchInput.focus();
}

function closeSiteSearch() {
  if (!siteSearch) return;

  siteSearch.hidden = true;
  searchToggle?.setAttribute("aria-expanded", "false");

  if (siteSearchInput) {
    siteSearchInput.value = "";
  }

  if (siteSearchResults) {
    siteSearchResults.innerHTML = "";
  }
}

searchToggle?.addEventListener("click", () => {
  if (siteSearch?.hidden) {
    openSiteSearch();
  } else {
    closeSiteSearch();
  }
});

siteSearchClose?.addEventListener("click", closeSiteSearch);

siteSearchInput?.addEventListener("input", (event) => {
  renderSearchResults(event.target.value);
});

siteSearchInput?.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeSiteSearch();
    searchToggle?.focus();
  }
});
