// ==========================================
// CYBERAWARE PAGE CHECK
// ==========================================

function isCyberAwarePage() {
  // Check meta marker
  const metaMarker = document.querySelector('meta[name="cyberaware-page"]');

  if (metaMarker) {
    return true;
  }

  // Check body marker
  if (document.body && document.body.dataset.cyberawarePage === "true") {
    return true;
  }

  // Check page title
  const title = document.title.toLowerCase();

  if (title.includes("cyberaware")) {
    return true;
  }

  // IMPORTANT:
  // Do NOT check localhost.
  // Do NOT check 127.0.0.1.
  // Do NOT check "cyber-awareness" in URL.
  // Local test pages must be scanned.

  return false;
}

// ==========================================
// 1. REMOVE OLD WARNING
// ==========================================

function removeCyberAwareWarning() {
  const warning = document.getElementById("cyberaware-warning");

  if (warning) {
    warning.remove();
  }
}

// ==========================================
// 2. GET CLEAN PAGE TEXT
// ==========================================

function getCleanPageText() {
  if (!document.body) {
    return "";
  }

  // Clone the page so we don't modify
  // the actual webpage.
  const pageClone = document.body.cloneNode(true);

  // Remove CyberAware's own warning
  // from the cloned page.
  const cyberAwareWarning = pageClone.querySelector("#cyberaware-warning");

  if (cyberAwareWarning) {
    cyberAwareWarning.remove();
  }

  return pageClone.innerText;
}

// ==========================================
// 3. CHECK PROTECTION
// ==========================================

function checkProtection() {
  // Never scan CyberAware itself
  if (isCyberAwarePage()) {
    console.log("CyberAware: Own page detected.");

    removeCyberAwareWarning();

    return;
  }

  chrome.storage.local.get(["protectionEnabled"], function (data) {
    const enabled = data.protectionEnabled !== false;

    if (enabled) {
      startProtection();
    } else {
      stopProtection();
    }
  });
}

// ==========================================
// 4. START PROTECTION
// ==========================================

function startProtection() {
  if (isCyberAwarePage()) {
    console.log("CyberAware: Protection skipped on own page.");

    removeCyberAwareWarning();

    return;
  }

  console.log("CyberAware Protection: ON");

  // Small delay so page content loads
  setTimeout(function () {
    // Check again before scanning
    if (isCyberAwarePage()) {
      console.log("CyberAware: Scan cancelled.");

      removeCyberAwareWarning();

      return;
    }

    const url = window.location.href;

    // Get clean page text
    const pageText = getCleanPageText();

    // ======================================
    // RUN RISK ENGINE
    // ======================================

    if (typeof globalThis.analyzeContent !== "function") {
      console.error("CyberAware: analyzeContent() is not available.");

      return;
    }

    const result = globalThis.analyzeContent(url, pageText);

    console.log("CyberAware Page Analysis:", result);

    // ======================================
    // SHOW WARNING
    // ======================================

    if (result.level !== "Safe") {
      showWarning(result);
    }
  }, 1000);
}

// ==========================================
// 5. STOP PROTECTION
// ==========================================

function stopProtection() {
  console.log("CyberAware Protection: OFF");

  removeCyberAwareWarning();
}

// ==========================================
// 6. SHOW WARNING
// ==========================================

function showWarning(result) {
  // Never show warning on CyberAware itself
  if (isCyberAwarePage()) {
    console.log("CyberAware: WARNING BLOCKED.");

    removeCyberAwareWarning();

    return;
  }

  // Remove previous warning
  removeCyberAwareWarning();

  // ========================================
  // CREATE MAIN WARNING BOX
  // ========================================

  const box = document.createElement("div");

  box.id = "cyberaware-warning";

  // ========================================
  // CREATE TITLE
  // ========================================

  const title = document.createElement("div");

  title.className = "cyberaware-title";

  if (result.level === "Dangerous") {
    title.textContent = "🚨 CyberAware Warning";
  } else {
    title.textContent = "⚠️ CyberAware Warning";
  }

  // ========================================
  // CREATE LEVEL
  // ========================================

  const level = document.createElement("div");

  level.className = "cyberaware-level";

  level.textContent = result.level + " Website";

  // ========================================
  // CREATE SCORE
  // ========================================

  const score = document.createElement("div");

  score.className = "cyberaware-score";

  score.textContent = "Risk Score: " + result.riskScore + "/99";

  // ========================================
  // CREATE REASONS
  // ========================================

  const reasons = document.createElement("div");

  reasons.className = "cyberaware-reasons";

  if (result.reasons && result.reasons.length > 0) {
    reasons.textContent = result.reasons.join(" • ");
  } else {
    reasons.textContent = "Suspicious activity detected.";
  }

  // ========================================
  // CREATE MESSAGE
  // ========================================

  const message = document.createElement("div");

  message.className = "cyberaware-message";

  message.textContent =
    "Do not enter passwords, OTPs, banking information, or payment details.";

  // ========================================
  // CREATE LEAVE BUTTON
  // ========================================

  const leaveButton = document.createElement("button");

  leaveButton.id = "cyberaware-leave";

  leaveButton.textContent = "Leave Site";

  // ========================================
  // BUTTON ACTION
  // ========================================

  leaveButton.addEventListener("click", function () {
    window.location.href = "https://example.com";
  });

  // ========================================
  // ADD ELEMENTS TO WARNING BOX
  // ========================================

  box.appendChild(title);
  box.appendChild(level);
  box.appendChild(score);
  box.appendChild(reasons);
  box.appendChild(message);
  box.appendChild(leaveButton);

  // ========================================
  // STYLE WARNING BOX
  // ========================================

  box.style.position = "fixed";

  box.style.top = "20px";

  box.style.left = "50%";

  box.style.transform = "translateX(-50%)";

  box.style.zIndex = "2147483647";

  box.style.width = "min(90%, 520px)";

  box.style.padding = "20px";

  box.style.color = "white";

  box.style.borderRadius = "14px";

  box.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";

  box.style.fontFamily = "Arial, sans-serif";

  // ========================================
  // DANGEROUS / SUSPICIOUS COLOR
  // ========================================

  if (result.level === "Dangerous") {
    box.style.background = "#7f1d1d";

    box.style.border = "2px solid #ef4444";
  } else {
    box.style.background = "#78350f";

    box.style.border = "2px solid #f59e0b";
  }

  // ========================================
  // STYLE TITLE
  // ========================================

  title.style.fontSize = "22px";

  title.style.fontWeight = "700";

  title.style.marginBottom = "10px";

  // ========================================
  // STYLE LEVEL
  // ========================================

  level.style.fontSize = "16px";

  level.style.fontWeight = "600";

  level.style.marginBottom = "8px";

  // ========================================
  // STYLE SCORE
  // ========================================

  score.style.fontSize = "18px";

  score.style.fontWeight = "700";

  score.style.marginBottom = "12px";

  // ========================================
  // STYLE REASONS
  // ========================================

  reasons.style.fontSize = "14px";

  reasons.style.lineHeight = "1.5";

  reasons.style.marginBottom = "12px";

  // ========================================
  // STYLE MESSAGE
  // ========================================

  message.style.fontSize = "14px";

  message.style.marginBottom = "16px";

  // ========================================
  // STYLE BUTTON
  // ========================================

  leaveButton.style.padding = "10px 18px";

  leaveButton.style.border = "none";

  leaveButton.style.borderRadius = "8px";

  leaveButton.style.background = "#ffffff";

  leaveButton.style.color = "#111827";

  leaveButton.style.fontWeight = "700";

  leaveButton.style.cursor = "pointer";

  // ========================================
  // ADD WARNING TO PAGE
  // ========================================

  document.body.appendChild(box);
}

// ==========================================
// 7. HANDLE MESSAGES FROM POPUP
// ==========================================

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // ======================================
  // MANUAL SCAN FROM POPUP
  // ======================================

  if (message && message.action === "analyzeCurrentPage") {
    // Don't analyze CyberAware itself
    if (isCyberAwarePage()) {
      sendResponse({
        protectionEnabled: true,
        riskScore: 0,
        level: "Safe",
        reasons: ["CyberAware page excluded from scanning"],
      });

      return;
    }

    // Check protection setting
    chrome.storage.local.get(["protectionEnabled"], function (data) {
      const enabled = data.protectionEnabled !== false;

      // Protection OFF
      if (!enabled) {
        sendResponse({
          protectionEnabled: false,
          riskScore: 0,
          level: "Safe",
          reasons: [],
        });

        return;
      }

      // Get current page URL
      const url = window.location.href;

      // Get CLEAN page text
      // CyberAware warning is excluded
      const pageText = getCleanPageText();

      // Check risk engine
      if (typeof globalThis.analyzeContent !== "function") {
        sendResponse({
          protectionEnabled: true,
          riskScore: 0,
          level: "Safe",
          reasons: ["Risk engine is unavailable"],
        });

        return;
      }

      // Analyze page
      const result = globalThis.analyzeContent(url, pageText);

      console.log("CyberAware Manual Scan:", result);

      // Send result back to popup
      sendResponse({
        protectionEnabled: true,
        riskScore: result.riskScore,
        level: result.level,
        reasons: result.reasons,
      });
    });

    // Async response
    return true;
  }

  // ======================================
  // PROTECTION ON/OFF
  // ======================================

  if (message && message.type === "PROTECTION_CHANGED") {
    // CyberAware page
    if (isCyberAwarePage()) {
      removeCyberAwareWarning();

      return;
    }

    // Normal website
    if (message.enabled) {
      startProtection();
    } else {
      stopProtection();
    }
  }
});

// ==========================================
// 8. START CONTENT SCRIPT
// ==========================================

if (isCyberAwarePage()) {
  console.log("CyberAware own page detected.");

  removeCyberAwareWarning();
} else {
  checkProtection();
}
