import { GoogleGenerativeAI } from "@google/generative-ai";

type GenerateRecipeParams = {
  message: string;
  favorites?: string[];
  tone?: "balanced" | "quick" | "healthy" | "budget";
};

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing VITE_GEMINI_API_KEY in environment.");
}

const genai = new GoogleGenerativeAI(apiKey);

export const generateRecipe = async ({
  message,
  favorites = [],
  tone = "balanced",
}: GenerateRecipeParams) => {
  const model = genai.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = [
    "You are a cooking assistant for a recipe app.",
    "Return markdown with:",
    "1) Recipe title",
    "2) Ingredients",
    "3) Steps",
    "4) Optional swaps",
    "Keep it concise and practical.",
    `Tone: ${tone}.`,
    favorites.length > 0
      ? `User favorite meals for context: ${favorites.slice(0, 20).join(", ")}`
      : "No favorites context provided.",
    `User request: ${message.trim()}`,
  ].join("\n");

  const result = await model.generateContent(prompt);
  return result.response.text();
};
