import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY in backend environment");
}

const genAI = new GoogleGenerativeAI(apiKey);
const MODEL_CANDIDATES = [
  "gemini-2.5-flash",
  "gemini-3.0-flash",
  "gemini-2.5-flash-lite",
  "gemini-3.1-flash-lite",
];

function shouldTryNextModel(error) {
  const status = Number(error?.status || error?.code || 0);
  const raw = String(error?.message || "").toLowerCase();

  return (
    status === 404 ||
    status === 403 ||
    status === 429 ||
    status === 503 ||
    raw.includes("not found") ||
    raw.includes("quota") ||
    raw.includes("too many requests") ||
    raw.includes("resource has been exhausted")
  );
}

export async function generateRecipe(message) {
  let lastError;

  for (const modelName of MODEL_CANDIDATES) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(message);
      return result.response.text();
    } catch (error) {
      lastError = error;
      if (!shouldTryNextModel(error)) {
        throw error;
      }
    }
  }

  throw lastError || new Error("No Gemini model available.");
}
