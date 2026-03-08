type GenerateRecipeInput = {
  message: string;
  favorites: string[];
  tone: "balanced" | "quick" | "healthy" | "budget";
};

function getApiUrl(path: string): string {
  const base = import.meta.env.VITE_API_BASE_URL?.trim();
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

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "AI request failed");
  }

  return data.reply;
}
