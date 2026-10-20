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

/* Local learning progress */

const progressStorageKey = "cybersafeAcademyProgress";

const progressActivities = {
  phishing: "Phishing Detective",
  safeUrl: "Safe URL Challenge",
  checkup: "Security Checkup"
};

function getLearningProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(progressStorageKey));
    return saved && typeof saved === "object" ? saved : {};
  } catch (error) {
    return {};
  }
}

function saveLearningProgress(progress) {
  try {
    localStorage.setItem(progressStorageKey, JSON.stringify(progress));
  } catch (error) {
    // Progress remains available for the current page session if storage is unavailable.
  }
}

function markLearningActivityComplete(activity) {
  if (!progressActivities[activity]) return;

  const progress = getLearningProgress();
  progress[activity] = true;
  saveLearningProgress(progress);
  updateLearningProgress();
}

function updateLearningProgress() {
  const progress = getLearningProgress();
  const keys = Object.keys(progressActivities);
  const completed = keys.filter((key) => progress[key]).length;
  const total = keys.length;
  const percentage = total ? Math.round((completed / total) * 100) : 0;

  const progressBar = document.getElementById("progressBar");
  const progressCount = document.getElementById("progressCount");
  const progressSummary = document.getElementById("progressSummary");

  if (progressBar) {
    progressBar.style.width = `${percentage}%`;
  }

  if (progressCount) {
    progressCount.textContent = `${completed} / ${total}`;
  }

  if (progressSummary) {
    if (completed === total) {
      progressSummary.textContent =
        "Great work. You have completed all three current practice activities on this device.";
    } else if (completed > 0) {
      progressSummary.textContent =
        `${completed} of ${total} practice activities completed. Keep going and build your security skills.`;
    } else {
      progressSummary.textContent =
        "Complete the practice activities to track your progress on this device.";
    }
  }
}

const missionProgressSlot = document.getElementById("mission-progress-slot");
const existingProgressPanel = document.getElementById("progress-panel");

if (missionProgressSlot && existingProgressPanel) {
  missionProgressSlot.appendChild(existingProgressPanel);
}

updateLearningProgress();



// SAFE LINK INSPECTOR V3 — local URL analysis; never visits the destination.
(() => {
  const input = document.getElementById("safeLinkInput");
  const inspectButton = document.getElementById("inspectSafeLink");
  const clearButton = document.getElementById("clearSafeLink");
  const result = document.getElementById("safeLinkResult");

  if (!input || !inspectButton || !clearButton || !result) return;

  const suspiciousTerms = [
    "login", "verify", "password", "wallet", "account",
    "gift", "claim", "bonus", "giveaway", "urgent",
    "payment", "free", "secure", "update", "confirm"
  ];

  // Limited educational suffix list, not a complete public suffix database.
  const commonMultiPartSuffixes = new Set([
    "co.uk", "org.uk", "ac.uk", "gov.uk",
    "com.au", "net.au", "org.au",
    "co.nz", "co.jp", "co.in",
    "com.ng", "org.ng", "net.ng", "gov.ng", "edu.ng",
    "com.br", "com.sg"
  ]);

  function addText(parent, tag, value, className) {
    const node = document.createElement(tag);
    node.textContent = value;
    if (className) node.className = className;
    parent.appendChild(node);
    return node;
  }

  function addSection(title, items) {
    if (!items.length) return;
    addText(result, "h4", title);
    const list = document.createElement("ul");
    items.forEach(item => {
      const li = document.createElement("li");
      addText(li, "strong", item.title);
      addText(li, "p", item.detail);
      if (item.action) {
        addText(li, "p", "What to do: " + item.action);
      }
      list.appendChild(li);
    });
    result.appendChild(list);
  }

  function showError(title, message) {
    result.replaceChildren();
    result.hidden = false;
    addText(result, "h3", title);
    addText(result, "p", message);
  }

  function estimateDomain(hostname) {
    const host = hostname.toLowerCase().replace(/\.$/, "");
    const labels = host.split(".");

    if (
      labels.length < 2 ||
      labels.some(label => !label) ||
      /^\d{1,3}(\.\d{1,3}){3}$/.test(host) ||
      host.startsWith("[")
    ) {
      return {
        value: "Not available",
        note: "A registered-domain estimate cannot reliably be made for this host."
      };
    }

    const lastTwo = labels.slice(-2).join(".");
    const suffixLength = commonMultiPartSuffixes.has(lastTwo) ? 2 : 1;

    if (labels.length <= suffixLength) {
      return {
        value: "Not available",
        note: "The hostname may be incomplete or use an unfamiliar suffix."
      };
    }

    return {
      value: labels.slice(-(suffixLength + 1)).join("."),
      note: "Estimate only, using a limited suffix list. This does not verify domain ownership."
    };
  }

  function analyze() {
    result.replaceChildren();
    result.hidden = false;

    const raw = input.value.trim();

    if (!raw) {
      showError("Enter a URL", "Paste the link you want to inspect.");
      input.focus();
      return;
    }

    if (raw.length > 2048 || /[\u0000-\u001f\u007f]/.test(raw)) {
      showError(
        "Unable to assess this input",
        "The URL is too long or contains control characters. Copy the address again and retry."
      );
      return;
    }

    if (/\s/.test(raw)) {
      showError(
        "Check the URL format",
        "The address contains whitespace. Check that you copied the complete link."
      );
      return;
    }

    const schemeMatch = raw.match(/^([a-zA-Z][a-zA-Z\d+.-]*):/);

    if (schemeMatch && !/^https?$/i.test(schemeMatch[1])) {
      showError(
        "Unsupported URL scheme",
        "This tool only analyzes HTTP and HTTPS web URLs. The input has not been opened or executed."
      );
      return;
    }

    if (raw.startsWith("//")) {
      showError(
        "Incomplete URL",
        "Enter a hostname or a full URL beginning with http:// or https://."
      );
      return;
    }

    let parsed;
    try {
      parsed = new URL(schemeMatch ? raw : "https://" + raw);
    } catch (_) {
      showError(
        "Unable to parse this URL",
        "Check the spelling, hostname, and URL format. This tool cannot assess the input reliably."
      );
      return;
    }

    if (!["http:", "https:"].includes(parsed.protocol) || !parsed.hostname) {
      showError("Unable to assess this URL", "A supported web hostname could not be identified.");
      return;
    }

    const hostname = parsed.hostname.toLowerCase().replace(/\.$/, "");
    const labels = hostname.split(".");
    const pathAndQuery = (parsed.pathname + " " + parsed.search).toLowerCase();
    const strong = [];
    const clues = [];
    const positiveObservations = [];

    if (parsed.protocol === "http:") {
      strong.push({
        title: "The connection uses HTTP",
        detail: "HTTP does not provide HTTPS transport encryption. Information sent over the connection may be exposed or altered.",
        action: "If the service is expected to use HTTPS, navigate to its known official address independently. HTTPS alone does not prove a site is trustworthy."
      });
    } else {
      positiveObservations.push({
        title: "The URL uses HTTPS",
        detail: "HTTPS indicates an encrypted connection when correctly configured. It does not establish that the operator is legitimate or that the content is safe."
      });
    }

    if (parsed.username || parsed.password) {
      strong.push({
        title: "Credentials appear before the hostname",
        detail: "The URL includes a username or password section before the @ separator. This structure can disguise which host the browser will visit.",
        action: "Do not enter credentials through a link you do not trust. Verify the destination independently."
      });
    }

    if (hostname.includes("xn--")) {
      clues.push({
        title: "The hostname contains punycode",
        detail: "Punycode is used for internationalized domain names. Some such domains are legitimate, while others can resemble familiar names.",
        action: "Check the exact spelling and verify the domain through a trusted source."
      });
    }

    if (labels.length >= 5) {
      clues.push({
        title: "The hostname has many labels or subdomains",
        detail: "A familiar brand name appearing somewhere in a hostname does not mean that brand controls the domain. The ending labels are important.",
        action: "Read the full hostname from right to left and verify the actual domain."
      });
    }

    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname) || hostname.startsWith("[")) {
      clues.push({
        title: "The host appears to be an IP address",
        detail: "The URL uses an IP literal instead of a conventional domain. This can be legitimate but is worth checking in context.",
        action: "Only use it if you independently know why this service uses that address."
      });
    }

    if (hostname.length > 50) {
      clues.push({
        title: "The hostname is unusually long",
        detail: "Long hostnames can be legitimate, but they may make misleading spellings harder to notice.",
        action: "Check the exact hostname rather than relying on a familiar word inside it."
      });
    }

    // Lookalike checks are educational clues, never proof of impersonation.
    const normalizedHost = hostname.toLowerCase();
    const hostLabels = normalizedHost.split(".");

    const familiarBrands = [
      { name: "paypal", label: "PayPal" },
      { name: "google", label: "Google" },
      { name: "amazon", label: "Amazon" },
      { name: "microsoft", label: "Microsoft" },
      { name: "apple", label: "Apple" }
    ];

    // Basic Unicode and ASCII lookalike checks.
    // Educational heuristic only; not a complete spoof detector.
    const unicodeLookalikes = {
      "\u0430": "a", "\u03b1": "a",
      "\u0435": "e", "\u03b5": "e",
      "\u043e": "o", "\u03bf": "o",
      "\u0440": "p", "\u03c1": "p",
      "\u0441": "c", "\u03f2": "c",
      "\u0445": "x", "\u03c7": "x",
      "\u0443": "y", "\u03c5": "y",
      "\u0456": "i", "\u03b9": "i",
      "\u0458": "j", "\u03ba": "k",
      "\u043c": "m", "\u03bc": "m",
      "\u0432": "b", "\u03bd": "v",
      "\u0442": "t", "\u03c4": "t",
      "\u04cf": "l", "\u217c": "l"
    };

    const normalizeLookalikes = value =>
      Array.from(value.normalize("NFKC").toLowerCase())
        .map(character => unicodeLookalikes[character] || character)
        .join("")
        .replace(/0/g, "o")
        .replace(/1/g, "l");

    const lookalikeMatches = [];

    for (const label of hostLabels) {
      const normalizedLabel = normalizeLookalikes(label);
      const alternateLabel = normalizedLabel.replace(/i/g, "l");

      for (const brand of familiarBrands) {
        if (
          (
            normalizedLabel.includes(brand.name) ||
            alternateLabel.includes(brand.name)
          ) &&
          !label.includes(brand.name)
        ) {
          lookalikeMatches.push(brand.label);
        }
      }
    }

    if (lookalikeMatches.length) {
      clues.push({
        title: "Possible lookalike spelling",
        detail: "A hostname label resembles " +
          [...new Set(lookalikeMatches)].join(", ") +
          " after basic character normalization. This heuristic can miss variations or flag unrelated names; it does not prove impersonation.",
        action: "Compare the exact hostname with the official domain obtained independently. Do not sign in or pay until you verify the destination."
      });
    }

    const estimated = estimateDomain(normalizedHost).value;
    const estimatedParts = estimated === "Not available"
      ? []
      : estimated.split(".");

    if (estimatedParts.length > 0) {
      const prefixLabels = hostLabels.slice(
        0,
        Math.max(0, hostLabels.length - estimatedParts.length)
      );
      const familiarNames = [
        "paypal", "google", "amazon", "microsoft", "apple"
      ];

      const brandLikeLabelOutsideEstimate = familiarNames.some(brand =>
        prefixLabels.some(label => label.includes(brand))
      );

      if (brandLikeLabelOutsideEstimate) {
        clues.push({
          title: "Familiar brand-like text appears before the estimated domain",
          detail: "A hostname label before the estimated domain ending contains a familiar brand name. Subdomains can be controlled by a different site operator.",
          action: "Check the actual domain ending in the hostname breakdown. The estimate uses limited suffix rules and may be incorrect."
        });
      }
    }

    const hostTerms = suspiciousTerms.filter(term =>
      hostname.split(/[^a-z0-9]+/).includes(term)
    );

    if (hostTerms.length) {
      clues.push({
        title: "The hostname includes attention-grabbing words",
        detail: "Detected terms: " + hostTerms.join(", ") + ". Such words can appear on legitimate sites and do not prove fraud.",
        action: "Consider whether the link was expected and verify the sender independently."
      });
    }

    const pathTerms = [...new Set(
      suspiciousTerms.filter(term => pathAndQuery.includes(term))
    )];

    if (pathTerms.length) {
      clues.push({
        title: "The path or query includes attention-grabbing words",
        detail: "Detected terms: " + pathTerms.join(", ") + ". URL paths often describe ordinary features, so context matters.",
        action: "Be especially cautious if the message pressures you to log in, pay, claim a reward, or reveal information."
      });
    }

    if (parsed.port) {
      clues.push({
        title: "The URL specifies a non-default port",
        detail: "A custom port can be legitimate, but it may be unexpected for a public website.",
        action: "Confirm the address with the service through a trusted channel."
      });
    }

    if (parsed.href.length > 120) {
      clues.push({
        title: "The URL is long",
        detail: "Long addresses may include tracking parameters or complex routing. Length alone is not evidence of a scam.",
        action: "Look carefully at the hostname and be wary of unexpected links."
      });
    }

    if (hostname.startsWith("www.") && hostname.length > 4) {
      // No risk conclusion: www is a common, ordinary hostname prefix.
    }

    const domain = estimateDomain(hostname);

    addText(result, "h3", "URL risk assessment");

    let verdict;
    let level;

    if (strong.length) {
      verdict = "Significant warning signs detected";
      level = "caution";
    } else if (clues.length) {
      verdict = "Review the findings before proceeding";
      level = "review";
    } else {
      verdict = "No obvious warning signs found by these checks";
      level = "neutral";
    }

    addText(result, "p", verdict, "safe-link-assessment " + level);
    addText(result, "p", "This is a structural assessment, not a verdict that the website is safe or malicious.");

    addText(result, "h4", "URL overview");
    const overview = document.createElement("ul");
    [
      ["Hostname", hostname],
      ["Protocol", parsed.protocol.replace(":", "").toUpperCase()],
      ["Best-effort domain estimate", domain.value],
      ["Path", parsed.pathname || "/"],
      ["Port", parsed.port || "Default for this protocol"]
    ].forEach(([label, value]) => {
      const li = document.createElement("li");
      addText(li, "strong", label + ": ");
      addText(li, "span", value);
      overview.appendChild(li);
    });
    result.appendChild(overview);
    addText(result, "p", domain.note);

    // Educational hostname breakdown — an estimate, not ownership verification.
    const hostPanel = document.createElement("div");
    hostPanel.className = "safe-link-host-breakdown";

    addText(hostPanel, "h4", "Hostname breakdown");
    addText(
      hostPanel,
      "p",
      "Read the hostname from right to left. Familiar words appearing earlier in the hostname do not establish who controls the domain."
    );

    const hostDetails = document.createElement("ul");
    [
      ["Full hostname", hostname],
      ["Estimated domain ending", domain.value]
    ].forEach(([label, value]) => {
      const li = document.createElement("li");
      addText(li, "strong", label + ": ");
      addText(li, "code", value);
      hostDetails.appendChild(li);
    });
    hostPanel.appendChild(hostDetails);

    if (hostname !== domain.value && hostname.endsWith("." + domain.value)) {
      const prefix = hostname.slice(0, -(domain.value.length + 1));
      addText(hostPanel, "p", "Hostname prefix before the estimate: " + prefix, "safe-link-host-prefix");
      addText(
        hostPanel,
        "p",
        "This prefix is part of the hostname, not proof that the estimated domain belongs to a familiar company."
      );
    } else {
      addText(
        hostPanel,
        "p",
        "The hostname and estimated domain are the same under this tool's limited suffix rules. This does not verify ownership or reputation."
      );
    }

    addText(
      hostPanel,
      "p",
      "Important: this is a best-effort educational breakdown. The suffix rules are limited and may not identify the registrable domain correctly for every address."
    );

    result.appendChild(hostPanel);

    addSection("Significant warning signs", strong);
    addSection("Other clues to review", clues);
    addSection("What looks ordinary", positiveObservations);

    if (!strong.length && !clues.length) {
      addText(
        result,
        "p",
        "These checks did not identify the warning patterns listed by this tool. They cannot establish whether the site is trustworthy."
      );
    }

    addText(result, "h4", "Recommended next steps");
    const nextSteps = document.createElement("ul");
    [
      "Do not enter passwords, one-time codes, banking details, or payment information on a page you did not independently verify.",
      "If the link claims to come from a company, open the company's known official app or type its known address yourself.",
      "Treat unexpected prizes, urgent warnings, and pressure to act as reasons to pause and verify.",
      "If you remain unsure, do not open the link."
    ].forEach(step => addText(nextSteps, "li", step));
    result.appendChild(nextSteps);

    addText(
      result,
      "p",
      "Limits: this tool does not visit the website, follow redirects, inspect page content, verify domain ownership, or query live threat databases. Its domain estimate uses a limited suffix list. No warning signs found does not mean safe."
    );
  }

  inspectButton.addEventListener("click", analyze);

  input.addEventListener("keydown", event => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      analyze();
    }
  });

  clearButton.addEventListener("click", () => {
    input.value = "";
    result.replaceChildren();
    result.hidden = true;
    input.focus();
  });
})();
