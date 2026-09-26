function analyzeUrl(url) {
  const lowerUrl = url.toLowerCase();

  let riskScore = 0;
  const reasons = [];

  // 1. Suspicious login patterns
  const loginPatterns = [
    "secure-login",
    "login-verify",
    "verify-account",
    "account-verification",
    "signin-secure",
  ];

  for (let i = 0; i < loginPatterns.length; i++) {
    if (lowerUrl.includes(loginPatterns[i])) {
      riskScore += 25;
      reasons.push("Suspicious login or verification pattern");
      break;
    }
  }

  // 2. Prize / money scam patterns
  const scamPatterns = [
    "free-prize",
    "winner",
    "claim-reward",
    "cash-prize",
    "free-money",
    "urgent-payment",
  ];

  for (let i = 0; i < scamPatterns.length; i++) {
    if (lowerUrl.includes(scamPatterns[i])) {
      riskScore += 30;
      reasons.push("Possible prize or payment scam pattern");
      break;
    }
  }

  // 3. Suspicious career patterns
  const careerPatterns = [
    "microsoft-careers-secure",
    "amazon-careers-secure",
    "google-careers-secure",
    "company-careers-login",
  ];

  for (let i = 0; i < careerPatterns.length; i++) {
    if (lowerUrl.includes(careerPatterns[i])) {
      riskScore += 45;
      reasons.push("Possible company impersonation pattern");
      break;
    }
  }

  // 4. Suspicious domain endings
  const suspiciousTlds = [".zip", ".top", ".click", ".buzz", ".work"];

  for (let i = 0; i < suspiciousTlds.length; i++) {
    if (lowerUrl.includes(suspiciousTlds[i])) {
      riskScore += 15;
      reasons.push("Unusual domain ending detected");
      break;
    }
  }

  // Maximum score
  riskScore = Math.min(riskScore, 99);

  let level = "Safe";

  if (riskScore >= 80) {
    level = "Dangerous";
  } else if (riskScore >= 40) {
    level = "Suspicious";
  }

  return {
    riskScore,
    level,
    reasons,
  };
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status !== "complete" || !tab.url) {
    return;
  }

  const result = analyzeUrl(tab.url);

  console.log("CyberAware URL Analysis:", {
    url: tab.url,
    riskScore: result.riskScore,
    level: result.level,
    reasons: result.reasons,
  });

  if (result.level === "Dangerous") {
    chrome.action.setBadgeText({
      tabId: tabId,
      text: "!",
    });

    chrome.action.setBadgeBackgroundColor({
      tabId: tabId,
      color: "#ef4444",
    });
  } else if (result.level === "Suspicious") {
    chrome.action.setBadgeText({
      tabId: tabId,
      text: "?",
    });

    chrome.action.setBadgeBackgroundColor({
      tabId: tabId,
      color: "#f59e0b",
    });
  } else {
    chrome.action.setBadgeText({
      tabId: tabId,
      text: "",
    });
  }
});
