const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { onDocumentWritten } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");

const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const Groq = require("groq-sdk");

admin.initializeApp();

// =====================================================
// GROQ API SECRET
// =====================================================

const GROQ_API_KEY = defineSecret("GROQ_API_KEY");

// =====================================================
// AI SCAM CHECKER
// =====================================================

exports.analyzeScam = onCall(
  {
    region: "asia-south1",

    // Give this Cloud Function access to the Groq secret
    secrets: [GROQ_API_KEY],
  },

  async (request) => {
    // =================================================
    // CHECK LOGIN
    // =================================================

    if (!request.auth) {
      throw new HttpsError(
        "unauthenticated",
        "You must be logged in to use the AI Scam Checker.",
      );
    }

    // =================================================
    // CHECK GROQ API KEY
    // =================================================

    const apiKey = String(GROQ_API_KEY.value() || "").trim();

    if (!apiKey) {
      logger.error("GROQ_API_KEY is missing.");

      throw new HttpsError(
        "failed-precondition",
        "Groq API key is not configured on the server.",
      );
    }

    // =================================================
    // CREATE GROQ CLIENT
    // =================================================

    const groq = new Groq({
      apiKey,
    });

    // =================================================
    // GET DATA
    // =================================================

    const text = String(request.data?.text || "").trim();
    const imageData = String(request.data?.imageData || "").trim();

    // =================================================
    // VALIDATE INPUT
    // =================================================

    if (!text && !imageData) {
      throw new HttpsError(
        "invalid-argument",
        "Please provide a message or screenshot to analyze.",
      );
    }

    if (text.length > 10000) {
      throw new HttpsError("invalid-argument", "Message is too long.");
    }

    // =================================================
    // LOG REQUEST
    // =================================================

    logger.info("CyberAware AI Scam Checker request", {
      uid: request.auth.uid,
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
    // ADD IMAGE IF PROVIDED
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
    // CALL GROQ AI
    // =================================================

    let completion;

    try {
      logger.info("Sending request to Groq AI...", {
        uid: request.auth.uid,

        // Current Groq model
        model: "qwen/qwen3.8-27b",

        hasImage: Boolean(imageData),
      });

      completion = await groq.chat.completions.create({
        // =================================================
        // GROQ MODEL
        // =================================================

        model: "qwen/qwen3.8-27b",

        messages: [
          {
            role: "user",
            content,
          },
        ],

        // Low temperature gives more consistent
        // scam classifications and JSON responses.
        temperature: 0.2,

        // Maximum response size.
        max_completion_tokens: 700,

        // We don't need visible reasoning for
        // a scam-classification application.
        reasoning_effort: "none",

        reasoning_format: "hidden",
      });

      logger.info("Groq API request completed successfully.", {
        uid: request.auth.uid,
        model: "qwen/qwen3.8-27b",
      });
    } catch (error) {
      logger.error("Groq AI request failed.", {
        uid: request.auth.uid,

        message: error?.message || "Unknown error",

        status: error?.status || null,

        name: error?.name || null,

        type: error?.type || null,

        code: error?.code || null,

        response: error?.response?.data || error?.response || null,

        stack: error?.stack || null,
      });

      throw new HttpsError(
        "internal",
        "Groq AI analysis failed. Please try again.",
      );
    }

    // =================================================
    // GET AI RESPONSE
    // =================================================

    const rawResponse = completion?.choices?.[0]?.message?.content || "";

    if (!rawResponse) {
      logger.error("Groq returned an empty response.", {
        uid: request.auth.uid,
      });

      throw new HttpsError("internal", "AI returned an empty response.");
    }

    logger.info("Groq returned an AI response.", {
      uid: request.auth.uid,
      responseLength: rawResponse.length,
    });

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
      logger.error("Invalid AI JSON response.", {
        uid: request.auth.uid,

        response: rawResponse,

        error: error?.message || "JSON parsing failed",
      });

      throw new HttpsError("internal", "AI returned an invalid analysis.");
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
    // LOG COMPLETED RESULT
    // =================================================

    logger.info("Groq AI analysis completed successfully.", {
      uid: request.auth.uid,
      risk,
      label,
    });

    // =================================================
    // RETURN RESULT
    // =================================================

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
