const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const Groq = require("groq-sdk");

const app = express();

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());

app.use(
  express.json({
    limit: "15mb",
  }),
);

// =====================================================
// FIREBASE ADMIN
// =====================================================

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

// =====================================================
// HEALTH CHECK
// =====================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CyberAware AI backend is running.",
  });
});

// =====================================================
// AI SCAM CHECKER
// =====================================================

app.post("/analyze-scam", async (req, res) => {
  try {
    // =================================================
    // CHECK FIREBASE LOGIN
    // =================================================

    const authHeader = req.headers.authorization || "";

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const idToken = authHeader.substring(7);

    let decodedToken;

    try {
      decodedToken = await admin.auth().verifyIdToken(idToken);
    } catch (error) {
      console.error("Firebase token verification failed:", error);

      return res.status(401).json({
        success: false,
        message: "Invalid or expired authentication token.",
      });
    }

    const uid = decodedToken.uid;

    // =================================================
    // CHECK GROQ API KEY
    // =================================================

    const apiKey = String(process.env.GROQ_API_KEY || "").trim();

    if (!apiKey) {
      console.error("GROQ_API_KEY is missing.");

      return res.status(500).json({
        success: false,
        message: "Groq API key is not configured.",
      });
    }

    const groq = new Groq({
      apiKey,
    });

    // =================================================
    // GET INPUT
    // =================================================

    const text = String(req.body?.text || "").trim();
    const imageData = String(req.body?.imageData || "").trim();

    if (!text && !imageData) {
      return res.status(400).json({
        success: false,
        message: "Please provide a message or screenshot.",
      });
    }

    if (text.length > 10000) {
      return res.status(400).json({
        success: false,
        message: "Message is too long.",
      });
    }

    console.log("CyberAware AI request:", {
      uid,
      hasText: Boolean(text),
      hasImage: Boolean(imageData),
      textLength: text.length,
    });

    // =================================================
    // BUILD AI INPUT
    // =================================================

    const content = [];

    content.push({
      type: "text",
      text: `
You are CyberAware, a cybersecurity scam detection assistant.

Analyze the provided message or screenshot carefully.

Determine whether the content appears to be:
- Safe
- Suspicious
- Scam

Look for:
- Fake offers
- Fake scholarships
- Fake internships
- Prize or lottery scams
- Phishing
- OTP requests
- UPI/payment requests
- Suspicious links
- Urgency or pressure
- Requests for personal or banking information
- Impersonation of companies or organizations

Return ONLY valid JSON in this exact structure:

{
  "risk": 0,
  "label": "Safe",
  "explanation": "Short explanation",
  "keywords": ["reason 1", "reason 2"],
  "tips": ["safety tip 1", "safety tip 2"]
}

Rules:
- risk must be an integer from 0 to 99.
- label must be exactly one of: Safe, Suspicious, Scam.
- Do not claim that the risk number is a mathematically calibrated probability.
- Base the assessment on the actual content.
- Keep the explanation concise.
- Give practical safety tips.
- Do not invent facts that are not present in the message or image.

${text ? `Message to analyze:\n${text}` : "Analyze the screenshot image."}
      `,
    });

    // =================================================
    // ADD IMAGE
    // =================================================

    if (imageData) {
      content.push({
        type: "image_url",
        image_url: {
          url: imageData,
        },
      });
    }

    // =================================================
    // CALL GROQ
    // =================================================

    let completion;

    try {
      console.log("Sending request to Groq AI...");

      completion = await groq.chat.completions.create({
        model: "qwen/qwen3.8-27b",

        messages: [
          {
            role: "user",
            content,
          },
        ],

        temperature: 0.2,

        max_completion_tokens: 700,

        reasoning_effort: "none",

        reasoning_format: "hidden",
      });

      console.log("Groq request completed.");
    } catch (error) {
      console.error("Groq AI request failed:", error);

      return res.status(500).json({
        success: false,
        message: "Groq AI analysis failed.",
      });
    }

    // =================================================
    // GET AI RESPONSE
    // =================================================

    const rawResponse = completion?.choices?.[0]?.message?.content || "";

    if (!rawResponse) {
      return res.status(500).json({
        success: false,
        message: "AI returned an empty response.",
      });
    }

    // =================================================
    // PARSE JSON
    // =================================================

    let result;

    try {
      const cleanedResponse = rawResponse
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      result = JSON.parse(cleanedResponse);
    } catch (error) {
      console.error("Invalid AI JSON:", rawResponse);

      return res.status(500).json({
        success: false,
        message: "AI returned an invalid analysis.",
      });
    }

    // =================================================
    // VALIDATE RISK
    // =================================================

    let risk = Number(result.risk);

    if (!Number.isFinite(risk)) {
      risk = 50;
    }

    risk = Math.max(0, Math.min(99, Math.round(risk)));

    // =================================================
    // VALIDATE LABEL
    // =================================================

    let label = String(result.label || "Suspicious").trim();

    if (!["Safe", "Suspicious", "Scam"].includes(label)) {
      label = risk >= 80 ? "Scam" : risk >= 40 ? "Suspicious" : "Safe";
    }

    // =================================================
    // EXPLANATION
    // =================================================

    const explanation = String(
      result.explanation || "The AI analyzed the provided content.",
    ).trim();

    // =================================================
    // KEYWORDS
    // =================================================

    const keywords = Array.isArray(result.keywords)
      ? result.keywords.map(String).slice(0, 10)
      : [];

    // =================================================
    // SAFETY TIPS
    // =================================================

    const tips = Array.isArray(result.tips)
      ? result.tips.map(String).slice(0, 10)
      : [
          "Do not share OTPs.",
          "Do not send money to unknown people.",
          "Verify the sender through an official source.",
        ];

    // =================================================
    // RETURN RESULT
    // =================================================

    console.log("CyberAware analysis completed:", {
      uid,
      risk,
      label,
    });

    return res.json({
      success: true,
      message: "CyberAware AI analysis completed successfully.",
      risk,
      label,
      explanation,
      keywords,
      tips,
    });
  } catch (error) {
    console.error("Unexpected server error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error occurred.",
    });
  }
});

// =====================================================
// START SERVER
// =====================================================

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`CyberAware backend running on port ${PORT}`);
});
