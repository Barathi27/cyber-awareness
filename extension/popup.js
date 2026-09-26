const toggle = document.getElementById("protectionToggle");

const protectionStatus = document.getElementById("protectionStatus");

const status = document.getElementById("status");

// ==========================================
// 1. LOAD SAVED PROTECTION SETTING
// ==========================================

chrome.storage.local.get(["protectionEnabled"], (data) => {
  // Default = ON
  const enabled = data.protectionEnabled !== false;

  toggle.checked = enabled;

  updateProtectionText(enabled);

  if (enabled) {
    analyzeCurrentPage();
  } else {
    showProtectionOff();
  }
});

// ==========================================
// 2. TOGGLE PROTECTION
// ==========================================

toggle.addEventListener("change", () => {
  const enabled = toggle.checked;

  // Save ON/OFF setting
  chrome.storage.local.set({
    protectionEnabled: enabled,
  });

  // Update ON/OFF text
  updateProtectionText(enabled);

  // Tell content.js
  sendProtectionMessage(enabled);

  if (enabled) {
    analyzeCurrentPage();
  } else {
    showProtectionOff();
  }
});

// ==========================================
// 3. SEND ON/OFF MESSAGE
// ==========================================

function sendProtectionMessage(enabled) {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },

    (tabs) => {
      const tab = tabs[0];

      if (!tab || !tab.id) {
        return;
      }

      chrome.tabs.sendMessage(
        tab.id,

        {
          type: "PROTECTION_CHANGED",
          enabled: enabled,
        },

        () => {
          // Ignore communication errors
          // because some Chrome pages
          // don't allow content scripts.

          if (chrome.runtime.lastError) {
            console.log("CyberAware:", "Could not send protection message.");
          }
        },
      );
    },
  );
}

// ==========================================
// 4. UPDATE ON/OFF TEXT
// ==========================================

function updateProtectionText(enabled) {
  if (enabled) {
    protectionStatus.textContent = "Protection ON";

    protectionStatus.style.color = "#22c55e";
  } else {
    protectionStatus.textContent = "Protection OFF";

    protectionStatus.style.color = "#ef4444";
  }
}

// ==========================================
// 5. SHOW PROTECTION OFF
// ==========================================

function showProtectionOff() {
  status.className = "";

  status.innerHTML =
    "<div class='label'>" +
    "🛡️ Protection Disabled" +
    "</div>" +
    "<div class='reasons'>" +
    "CyberAware is not scanning this website." +
    "</div>";
}

// ==========================================
// 6. ANALYZE CURRENT WEBSITE
// ==========================================

function analyzeCurrentPage() {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },

    (tabs) => {
      const tab = tabs[0];

      // Check current tab
      if (!tab || !tab.id || !tab.url) {
        status.innerHTML =
          "<div class='label'>" +
          "⚠️ Unable to check" +
          "</div>" +
          "<div class='reasons'>" +
          "Unable to access the current website." +
          "</div>";

        return;
      }

      // Send message to content.js
      chrome.tabs.sendMessage(
        tab.id,

        {
          action: "analyzeCurrentPage",
        },

        (result) => {
          // Check communication error
          if (chrome.runtime.lastError) {
            status.innerHTML =
              "<div class='label'>" +
              "⚠️ Unable to scan page" +
              "</div>" +
              "<div class='reasons'>" +
              "CyberAware could not access this webpage." +
              "</div>";

            return;
          }

          // Check result
          if (!result) {
            status.innerHTML =
              "<div class='label'>" +
              "⚠️ No analysis result" +
              "</div>" +
              "<div class='reasons'>" +
              "No analysis result was returned." +
              "</div>";

            return;
          }

          console.log("CyberAware Popup Analysis:", result);

          // Display result
          displayResult(result);
        },
      );
    },
  );
}

// ==========================================
// 7. DISPLAY RESULT
// ==========================================

function displayResult(result) {
  status.className = "";

  // ========================================
  // PROTECTION OFF
  // ========================================

  if (result.protectionEnabled === false) {
    showProtectionOff();

    return;
  }

  // ========================================
  // SAFE
  // ========================================

  if (result.level === "Safe") {
    status.classList.add("safe");

    status.innerHTML =
      "<div class='label'>" +
      "🟢 Safe Website" +
      "</div>" +
      "<div class='score'>" +
      "Risk Score: " +
      result.riskScore +
      "/99" +
      "</div>" +
      "<div class='reasons'>" +
      "No suspicious activity detected." +
      "</div>";

    return;
  }

  // ========================================
  // SUSPICIOUS
  // ========================================

  if (result.level === "Suspicious") {
    status.classList.add("suspicious");

    status.innerHTML =
      "<div class='label'>" +
      "⚠️ Suspicious Website" +
      "</div>" +
      "<div class='score'>" +
      "Risk Score: " +
      result.riskScore +
      "/99" +
      "</div>" +
      "<div class='reasons'>" +
      result.reasons.join("<br>") +
      "</div>";

    return;
  }

  // ========================================
  // DANGEROUS
  // ========================================

  status.classList.add("dangerous");

  status.innerHTML =
    "<div class='label'>" +
    "🚨 Dangerous Website" +
    "</div>" +
    "<div class='score'>" +
    "Risk Score: " +
    result.riskScore +
    "/99" +
    "</div>" +
    "<div class='reasons'>" +
    result.reasons.join("<br>") +
    "<br><br>" +
    "Do not enter passwords, OTPs, " +
    "banking information or payment details." +
    "</div>";
}
