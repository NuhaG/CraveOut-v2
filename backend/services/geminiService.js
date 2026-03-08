import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY in backend environment");
}

const genAI = new GoogleGenerativeAI(apiKey);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function tryGenerateWithModel(modelName, prompt) {
  const model = genAI.getGenerativeModel({ model: modelName });
  let attempt = 0;

  while (attempt < 2) {
    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 450,
        },
      });
      return result.response.text();
    } catch (error) {
      const message = String(error?.message || "").toLowerCase();
      const status = Number(error?.status || error?.code || 0);
      const isTransient =
        status === 429 ||
        status === 503 ||
        message.includes("quota") ||
        message.includes("resource has been exhausted") ||
        message.includes("too many requests");

      if (!isTransient || attempt === 1) {
        throw error;
      }

      await sleep(800 * (attempt + 1));
      attempt += 1;
    }
  }

  throw new Error("AI generation failed.");
}

export async function generateRecipe(prompt) {
  const modelCandidates = [
    "gemini-2.0-flash-lite",
    "gemini-2.0-flash",
    "gemini-1.5-flash",
  ];

  let lastError;

  for (const modelName of modelCandidates) {
    try {
      return await tryGenerateWithModel(modelName, prompt);
    } catch (error) {
      lastError = error;
      const message = String(error?.message || "").toLowerCase();
      const status = Number(error?.status || error?.code || 0);
      const modelUnavailable =
        status === 404 ||
        message.includes("not found") ||
        message.includes("is not found for api version");

      if (!modelUnavailable) {
        throw error;
      }
    }
  }

  throw lastError || new Error("No supported Gemini model is available.");
}
