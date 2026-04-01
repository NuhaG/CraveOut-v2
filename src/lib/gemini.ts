type GenerateRecipeInput = {
  message: string;
  favorites?: string[];
  tone?: "balanced" | "quick" | "healthy" | "budget";
};

function getApiUrl(path: string): string {
  const envBase = import.meta.env.VITE_API_BASE_URL?.trim();
  const base = envBase || "";
  if (!base) return path;
  return `${base.replace(/\/+$/, "")}${path}`;
}

export async function generateRecipe({
  message,
  favorites = [],
  tone = "balanced",
}: GenerateRecipeInput): Promise<string> {
  const res = await fetch(getApiUrl("/api/ai/chat"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, favorites, tone }),
  });

  const rawBody = await res.text();
  let parsedData: { reply?: string; error?: string } | null = null;
  try {
    parsedData = rawBody ? (JSON.parse(rawBody) as { reply?: string; error?: string }) : null;
  } catch {
    parsedData = null;
  }

  if (!res.ok) {
    throw new Error(parsedData?.error || `AI request failed (${res.status}).`);
  }

  const reply = parsedData?.reply;
  if (!reply) {
    throw new Error("Invalid AI response.");
  }

  return reply;
}
