const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { onDocumentWritten } = require("firebase-functions/v2/firestore");

const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const Groq = require("groq-sdk");

admin.initializeApp();

// =====================================================
// GROQ AI
// =====================================================

const groq = new Groq({
  apiKey: String(process.env.GROQ_API_KEY || "").trim(),
});

// =====================================================
// AI SCAM CHECKER
// =====================================================

exports.analyzeScam = onCall(
  {
    region: "asia-south1",
  },
  async (request) => {
    // -----------------------------
    // CHECK LOGIN
    // -----------------------------

    if (!request.auth) {
      throw new HttpsError(
        "unauthenticated",
        "You must be logged in to use the AI Scam Checker.",
      );
    }

    // -----------------------------
    // GET DATA
    // -----------------------------

    const text = String(request.data?.text || "").trim();
    const imageData = String(request.data?.imageData || "").trim();

    // -----------------------------
    // VALIDATE INPUT
    // -----------------------------

    if (!text && !imageData) {
      throw new HttpsError(
        "invalid-argument",
        "Please provide a message or screenshot to analyze.",
      );
    }

    if (text.length > 10000) {
      throw new HttpsError("invalid-argument", "Message is too long.");
    }

    // -----------------------------
    // LOG REQUEST
    // -----------------------------

    logger.info("CyberAware AI Scam Checker request", {
      uid: request.auth.uid,
      hasText: Boolean(text),
      hasImage: Boolean(imageData),
    });

    // -----------------------------
    // BUILD AI INPUT
    // -----------------------------

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
- Requests for personal/banking information
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

${text ? `Message to analyze:\n${text}` : "Analyze the screenshot image."}
      `,
    });

    // -----------------------------
    // ADD IMAGE
    // -----------------------------

    if (imageData) {
      content.push({
        type: "image_url",
        image_url: {
          url: imageData,
        },
      });
    }

    // -----------------------------
    // CALL GROQ VISION MODEL
    // -----------------------------

    let completion;

    try {
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
      });
    } catch (error) {
      logger.error("Groq AI request failed", {
        message: error?.message || "Unknown error",
        status: error?.status || null,
        name: error?.name || null,
        stack: error?.stack || null,
      });

      throw new HttpsError(
        "internal",
        error?.message || "AI analysis failed. Please try again.",
      );
    }

    // -----------------------------
    // GET AI RESPONSE
    // -----------------------------

    const rawResponse = completion?.choices?.[0]?.message?.content || "";

    if (!rawResponse) {
      logger.error("Groq returned an empty response.");

      throw new HttpsError("internal", "AI returned an empty response.");
    }

    // -----------------------------
    // PARSE JSON
    // -----------------------------

    let result;

    try {
      const cleanedResponse = rawResponse
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      result = JSON.parse(cleanedResponse);
    } catch (error) {
      logger.error("Invalid AI JSON response", {
        response: rawResponse,
        error: error?.message || "JSON parsing failed",
      });

      throw new HttpsError("internal", "AI returned an invalid analysis.");
    }

    // -----------------------------
    // VALIDATE AI RESULT
    // -----------------------------

    let risk = Number(result.risk);

    if (!Number.isFinite(risk)) {
      risk = 50;
    }

    risk = Math.max(0, Math.min(99, Math.round(risk)));

    let label = String(result.label || "Suspicious");

    if (!["Safe", "Suspicious", "Scam"].includes(label)) {
      label = risk >= 80 ? "Scam" : risk >= 40 ? "Suspicious" : "Safe";
    }

    const explanation = String(
      result.explanation || "The AI analyzed the provided content.",
    ).trim();

    const keywords = Array.isArray(result.keywords)
      ? result.keywords.map(String).slice(0, 10)
      : [];

    const tips = Array.isArray(result.tips)
      ? result.tips.map(String).slice(0, 10)
      : [
          "Do not share OTPs.",
          "Do not send money to unknown people.",
          "Verify the sender through an official source.",
        ];

    // -----------------------------
    // LOG COMPLETED RESULT
    // -----------------------------

    logger.info("Groq AI analysis completed", {
      uid: request.auth.uid,
      risk,
      label,
    });

    // -----------------------------
    // RETURN RESULT
    // -----------------------------

    return {
      success: true,

      message: "CyberAware AI analysis completed successfully.",

      risk,

      label,

      explanation,

      keywords,

      tips,
    };
  },
);

// =====================================================
// LEADERBOARD SYNC
// =====================================================

exports.syncLeaderboard = onDocumentWritten(
  {
    document: "users/{userId}",
    region: "asia-south1",
  },

  async (event) => {
    const userId = event.params.userId;

    const before = event.data?.before?.data();
    const after = event.data?.after?.data();

    const leaderboardRef = admin
      .firestore()
      .collection("leaderboard")
      .doc(userId);

    // =================================================
    // USER DELETED
    // =================================================

    if (!after) {
      await leaderboardRef.delete();

      logger.info("Leaderboard entry deleted", {
        userId,
      });

      return;
    }

    // =================================================
    // ONLY STUDENTS
    // =================================================

    if (after.role !== "student") {
      await leaderboardRef.delete();

      return;
    }

    // =================================================
    // CREATE / UPDATE LEADERBOARD ENTRY
    // =================================================

    const leaderboardData = {
      name: after.name || "Student",

      bestQuizScore: Number(after.bestQuizScore || 0),

      awarenessScore: Number(after.awarenessScore || 0),

      certificates: Number(after.certificates || 0),

      quizzesCompleted: Number(after.quizzesCompleted || 0),

      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await leaderboardRef.set(leaderboardData, {
      merge: true,
    });

    logger.info("Leaderboard entry synchronized", {
      userId,

      name: leaderboardData.name,

      bestQuizScore: leaderboardData.bestQuizScore,
    });
  },
);
