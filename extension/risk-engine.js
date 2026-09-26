// ==========================================
// CYBERAWARE RISK ENGINE
// ==========================================

globalThis.analyzeContent = function (url, pageText) {
  const lowerUrl = String(url || "").toLowerCase();
  const text = String(pageText || "").toLowerCase();

  let riskScore = 0;
  const reasons = [];

  // ==========================================
  // 1. SUSPICIOUS URL PATTERNS
  // ==========================================

  const suspiciousUrlPatterns = [
    "secure-login",
    "login-verify",
    "verify-account",
    "account-verification",
    "signin-secure",
    "claim-reward",
    "free-prize",
    "cash-prize",
    "urgent-payment",
  ];

  for (let i = 0; i < suspiciousUrlPatterns.length; i++) {
    if (lowerUrl.includes(suspiciousUrlPatterns[i])) {
      riskScore += 25;

      reasons.push("Suspicious URL pattern detected");

      break;
    }
  }

  // ==========================================
  // 2. COMPANY IMPERSONATION
  // ==========================================

  const companyNames = [
    "microsoft",
    "amazon",
    "google",
    "apple",
    "meta",
    "infosys",
    "tcs",
  ];

  const careerWords = [
    "careers",
    "career",
    "internship",
    "job",
    "hiring",
    "recruitment",
  ];

  let companyFound = false;
  let careerFound = false;

  for (let i = 0; i < companyNames.length; i++) {
    if (text.includes(companyNames[i])) {
      companyFound = true;

      break;
    }
  }

  for (let i = 0; i < careerWords.length; i++) {
    if (text.includes(careerWords[i])) {
      careerFound = true;

      break;
    }
  }

  if (companyFound && careerFound) {
    riskScore += 30;

    reasons.push("Possible company impersonation or fake career page");
  }

  // ==========================================
  // 3. PASSWORD REQUEST
  // ==========================================

  const passwordWords = [
    "enter your password",
    "password",
    "login password",
    "account password",
  ];

  for (let i = 0; i < passwordWords.length; i++) {
    if (text.includes(passwordWords[i])) {
      riskScore += 20;

      reasons.push("Password information requested");

      break;
    }
  }

  // ==========================================
  // 4. OTP REQUEST
  // ==========================================

  const otpWords = [
    "otp",
    "one time password",
    "verification code",
    "security code",
  ];

  for (let i = 0; i < otpWords.length; i++) {
    if (text.includes(otpWords[i])) {
      riskScore += 25;

      reasons.push("OTP or verification code requested");

      break;
    }
  }

  // ==========================================
  // 5. PAYMENT REQUEST
  // ==========================================

  const paymentWords = [
    "pay",
    "payment",
    "registration fee",
    "application fee",
    "processing fee",
    "pay now",
    "upi",
    "bank account",
    "credit card",
    "debit card",
  ];

  for (let i = 0; i < paymentWords.length; i++) {
    if (text.includes(paymentWords[i])) {
      riskScore += 25;

      reasons.push("Payment or financial information requested");

      break;
    }
  }

  // ==========================================
  // 6. URGENCY / THREAT LANGUAGE
  // ==========================================

  const urgentWords = [
    "urgent",
    "act now",
    "immediately",
    "limited time",
    "account will be blocked",
    "account will be suspended",
    "verify now",
  ];

  for (let i = 0; i < urgentWords.length; i++) {
    if (text.includes(urgentWords[i])) {
      riskScore += 15;

      reasons.push("Urgent or threatening language detected");

      break;
    }
  }

  // ==========================================
  // 7. PRIZE / REWARD SCAM
  // ==========================================

  const rewardWords = [
    "you won",
    "winner",
    "free prize",
    "claim your reward",
    "cash prize",
    "lottery",
    "congratulations",
  ];

  for (let i = 0; i < rewardWords.length; i++) {
    if (text.includes(rewardWords[i])) {
      riskScore += 30;

      reasons.push("Possible prize or reward scam detected");

      break;
    }
  }

  // ==========================================
  // 8. SUSPICIOUS DOMAIN ENDINGS
  // ==========================================

  const suspiciousTlds = [".zip", ".top", ".click", ".buzz", ".work"];

  for (let i = 0; i < suspiciousTlds.length; i++) {
    if (lowerUrl.includes(suspiciousTlds[i])) {
      riskScore += 15;

      reasons.push("Unusual domain ending detected");

      break;
    }
  }

  // ==========================================
  // 9. LIMIT SCORE
  // ==========================================

  riskScore = Math.min(riskScore, 99);

  // ==========================================
  // 10. DETERMINE RISK LEVEL
  // ==========================================

  let level = "Safe";

  if (riskScore >= 80) {
    level = "Dangerous";
  } else if (riskScore >= 40) {
    level = "Suspicious";
  }

  // ==========================================
  // 11. RETURN RESULT
  // ==========================================

  return {
    riskScore: riskScore,
    level: level,
    reasons: reasons,
  };
};
