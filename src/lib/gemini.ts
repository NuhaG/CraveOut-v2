type GenerateRecipeInput = {
  message: string;
  favorites: string[];
  tone: "balanced" | "quick" | "healthy" | "budget";
};

function getApiUrl(path: string): string {
  const envBase = import.meta.env.VITE_API_BASE_URL?.trim();
  const defaultBase = import.meta.env.PROD
    ? "https://craveout-v2.onrender.com"
    : "";
  const base = envBase || defaultBase;
  if (!base) return path;
  return `${base.replace(/\/+$/, "")}${path}`;
}

export async function generateRecipe({
  message,
  favorites,
  tone,
}: GenerateRecipeInput): Promise<string> {
  const res = await fetch(getApiUrl("/api/ai/chat"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      favorites,
      tone,
    }),
  });

  const rawBody = await res.text();
  const contentType = res.headers.get("content-type") ?? "";
  const isJsonResponse = contentType.includes("application/json");
  let parsedData: { reply?: string; error?: string } | null = null;
  if (isJsonResponse && rawBody) {
    try {
      parsedData = JSON.parse(rawBody) as { reply?: string; error?: string };
    } catch {
      parsedData = null;
    }
  }

  if (!res.ok) {
    const bodySnippet = rawBody.replace(/\s+/g, " ").trim().slice(0, 140);
    const apiError = parsedData?.error?.trim();
    throw new Error(
      apiError ||
      (bodySnippet
        ? `AI request failed (${res.status}). ${bodySnippet}`
        : `AI request failed (${res.status}).`)
    );
  }

  const reply = parsedData?.reply;
  if (typeof reply !== "string" || !reply.trim()) {
    throw new Error("AI service returned an unexpected response format.");
  }

  return reply;
}
