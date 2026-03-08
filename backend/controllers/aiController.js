import { generateRecipe } from "../services/geminiService.js";

function getAiErrorInfo(err) {
  const status = Number(err?.status || err?.code || 0);
  const raw = String(err?.message || "").toLowerCase();

  if (raw.includes("api key") || raw.includes("apikey") || raw.includes("permission denied")) {
    return { status: 401, error: "Gemini API key is invalid or missing." };
  }
  if (
    status === 429 ||
    raw.includes("quota") ||
    raw.includes("resource has been exhausted") ||
    raw.includes("too many requests")
  ) {
    return { status: 429, error: "Gemini quota/rate limit reached. Please try again later." };
  }
  if (status === 404 || raw.includes("model") || raw.includes("not found")) {
    return { status: 404, error: "Configured Gemini model is unavailable for this key/project." };
  }

  return { status: 500, error: "AI service is temporarily unavailable. Please try again." };
}

export async function askAI(req, res) {
  try {
    const { message, favorites, tone } = req.body;

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message required" });
    }
    if (message.length > 2000) {
      return res.status(400).json({ error: "Message too long" });
    }

    const safeTone = ["balanced", "quick", "healthy", "budget"].includes(tone)
      ? tone
      : "balanced";
    const safeFavorites = Array.isArray(favorites)
      ? favorites
          .filter((item) => typeof item === "string" && item.trim())
          .slice(0, 8)
      : [];

    const assistantRules = [
      "You are CraveOut Chef AI.",
      "Only answer food-related requests: recipes, meal ideas, meal plans, cooking methods, ingredient swaps, and dietary adjustments.",
      "Treat broad messages like 'I am hungry' as valid food requests.",
      "If the user asks non-food topics, briefly redirect with:",
      '"I can help with recipes, meal plans, dietary adjustments, and cooking tips."',
      "Use concise markdown.",
    ].join("\n");

    const prompt = `
        ${assistantRules}

        Tone: ${safeTone}
        User favorite meals: ${safeFavorites.join(", ") || "none"}
        User request: ${message.trim()}
    `;

    const reply = await generateRecipe(prompt);

    res.json({ reply });
  } catch (err) {
    console.error("AI chat error:", err);
    const info = getAiErrorInfo(err);
    res.status(info.status).json({ error: info.error });
  }
}
