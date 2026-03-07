import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing VITE_GEMINI_API_KEY in environment.");
}

const genai = new GoogleGenerativeAI(apiKey);

export const generateRecipe = async (prompt: string) => {
  const model = genai.getGenerativeModel({ model: "gemini-2.5-flash" });
  
  const result = await model.generateContent(prompt.trim());
  return result.response.text();
};
