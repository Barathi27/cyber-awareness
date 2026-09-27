const Groq = require("groq-sdk");

module.exports = async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    // Check API key
    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({
        error: "GROQ_API_KEY is not configured in Vercel.",
      });
    }

    const { text = "", imageData = null } = req.body || {};

    if (!text && !imageData) {
      return res.status(400).json({
        error: "Please provide text or an image.",
      });
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const prompt = `
You are a cybersecurity scam detection assistant.

Analyze the provided message/image and determine whether it is potentially
a scam, phishing message, fake internship, fake scholarship, fraudulent
offer, malicious link, or other suspicious content.

Return ONLY valid JSON in this exact structure:

{
  "risk": 0,
  "label": "Safe",
  "explanation": "Short explanation",
  "keywords": [],
  "tips": [],
  "engine": "Groq AI"
}

Rules:

- risk must be a number from 0 to 100.
- 0-30 = Safe
- 31-60 = Suspicious
- 61-80 = High Risk
- 81-100 = Scam
- keywords must contain important suspicious words/signals found.
- tips must contain practical safety advice.
- Do not use Markdown.
`;

    const userContent = [];

    if (text) {
      userContent.push({
        type: "text",
        text: `${prompt}\n\nMessage to analyze:\n${text}`,
      });
    } else {
      userContent.push({
        type: "text",
        text: prompt + "\n\nAnalyze the attached screenshot.",
      });
    }

    if (imageData) {
      userContent.push({
        type: "image_url",
        image_url: {
          url: imageData,
        },
      });
    }

    const completion = await groq.chat.completions.create({
      model: "qwen/qwen3.8-27b",
      messages: [
        {
          role: "user",
          content: userContent,
        },
      ],
      temperature: 0.2,
      max_completion_tokens: 1000,
      response_format: {
        type: "json_object",
      },
    });

    const rawResponse = completion.choices?.[0]?.message?.content || "";

    // Remove accidental Markdown code fences
    const cleanedResponse = rawResponse
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let result;

    try {
      result = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error("Groq returned invalid JSON:", rawResponse);

      return res.status(500).json({
        error: "AI returned an invalid response.",
        raw: rawResponse,
      });
    }

    // Make sure expected fields exist
    result.risk = Number(result.risk) || 0;
    result.label = result.label || "Unknown";
    result.explanation = result.explanation || "No explanation provided.";
    result.keywords = Array.isArray(result.keywords) ? result.keywords : [];
    result.tips = Array.isArray(result.tips) ? result.tips : [];
    result.engine = "Groq AI";

    return res.status(200).json(result);
  } catch (error) {
    console.error("AI Scam Checker error:", error);

    return res.status(500).json({
      error: "AI analysis failed.",
      details: error.message,
    });
  }
};
