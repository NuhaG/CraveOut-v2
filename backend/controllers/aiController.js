import { generateRecipe } from "../services/geminiService.js";

const FOOD_KEYWORDS = [
  "food",
  "meal",
  "recipe",
  "cook",
  "cooking",
  "dish",
  "ingredient",
  "hungry",
  "breakfast",
  "lunch",
  "dinner",
  "snack",
  "dessert",
  "drink",
  "protein",
  "vegan",
  "vegetarian",
  "keto",
  "biryani",
  "pasta",
  "rice",
  "chicken",
  "egg",
  "fish",
  "salad",
];

function isFoodRelated(text) {
  const raw = String(text || "").toLowerCase();
  return FOOD_KEYWORDS.some((word) => raw.includes(word));
}

export async function askAI(req, res) {
  try {
    const { message, favorites, tone } = req.body;

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message required" });
    }

    if (!isFoodRelated(message)) {
      return res.json({
        reply: "I can help with recipes, meal plans, dietary adjustments, and cooking tips.",
      });
    }

    const safeTone = ["balanced", "quick", "healthy", "budget"].includes(tone)
      ? tone
      : "balanced";
    const safeFavorites = Array.isArray(favorites)
      ? favorites.filter((item) => typeof item === "string" && item.trim()).slice(0, 20)
      : [];

    const prompt = [
      "You are CraveOut Chef AI. Only answer food-related requests.",
      "If user intent is unclear, infer a practical recipe request from context.",
      `Tone: ${safeTone}`,
      `User favorites: ${safeFavorites.join(", ") || "none"}`,
      "",
      "Return markdown using this exact section structure and headings:",
      "## Dish Name",
      "## Why This Fits",
      "## Ingredients",
      "## Instructions",
      "## Time & Servings",
      "## Nutrition Notes",
      "## Budget / Swap Tips",
      "",
      "Formatting rules:",
      "- Keep Ingredients as bullet list.",
      "- Keep Instructions as numbered list.",
      "- Keep response concise and practical.",
      "- Do not include any non-food topics.",
      "",
      `User request: ${message.trim()}`,
    ].join("\n");

    const reply = await generateRecipe(prompt);

    res.json({ reply });
  } catch (err) {
    console.error("AI chat error:", err);
    const status = Number(err?.status || err?.code || 500);
    const safeStatus = Number.isFinite(status) && status >= 400 && status < 600 ? status : 500;
    const message =
      typeof err?.message === "string" && err.message.trim()
        ? err.message
        : "AI request failed.";
    res.status(safeStatus).json({ error: message });
  }
}
