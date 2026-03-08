export type PlanSection = {
  title: string;
  content: string;
};

export type SavedAiPlan = {
  id: string;
  createdAt: string;
  userPrompt: string;
  assistantReply: string;
  sections: PlanSection[];
};

export const AI_PLANS_STORAGE_KEY = "craveout_ai_plans";

export function parsePlanSections(markdown: string): PlanSection[] {
  const headingRegex = /^##\s+(.+)$/gm;
  const matches = [...markdown.matchAll(headingRegex)];

  if (matches.length === 0) return [];

  return matches
    .map((match, index) => {
      const title = match[1].trim();
      const start = (match.index ?? 0) + match[0].length;
      const end =
        index + 1 < matches.length
          ? matches[index + 1].index ?? markdown.length
          : markdown.length;

      return {
        title,
        content: markdown.slice(start, end).trim(),
      };
    })
    .filter((section) => section.content.length > 0);
}

export function getSavedAiPlans(): SavedAiPlan[] {
  try {
    const raw = localStorage.getItem(AI_PLANS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedAiPlan[]) : [];
  } catch {
    return [];
  }
}

export function saveAiPlan(plan: Omit<SavedAiPlan, "id" | "createdAt">): SavedAiPlan {
  const current = getSavedAiPlans();
  const nextItem: SavedAiPlan = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    ...plan,
  };
  const next = [nextItem, ...current].slice(0, 50);
  localStorage.setItem(AI_PLANS_STORAGE_KEY, JSON.stringify(next));
  return nextItem;
}

export function removeAiPlan(id: string) {
  const next = getSavedAiPlans().filter((item) => item.id !== id);
  localStorage.setItem(AI_PLANS_STORAGE_KEY, JSON.stringify(next));
}

export function clearAiPlans() {
  localStorage.removeItem(AI_PLANS_STORAGE_KEY);
}
