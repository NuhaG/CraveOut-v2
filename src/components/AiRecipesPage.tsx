import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { clearAiPlans, getSavedAiPlans, removeAiPlan } from "../lib/aiPlans";

const AiRecipesPage = () => {
  const [plans, setPlans] = useState(getSavedAiPlans());

  const hasPlans = useMemo(() => plans.length > 0, [plans.length]);

  const handleDelete = (id: string) => {
    removeAiPlan(id);
    setPlans(getSavedAiPlans());
  };

  const handleClearAll = () => {
    clearAiPlans();
    setPlans([]);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--accent)]">
              AI Recipes
            </h1>
            <p className="text-card text-sm mt-2">
              Saved plans and recipes generated from AI Chat.
            </p>
          </div>

          {hasPlans && (
            <button
              type="button"
              onClick={handleClearAll}
              className="rounded-lg border border-red-400 px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 transition"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Empty state */}
        {!hasPlans && (
          <div className="rounded-xl border border-[var(--accent)] bg-card p-8 text-center text-card">
            No saved AI recipes yet.

            <br />
            Save a recipe from AI Chat to view it here.
          </div>
        )}

        {/* Recipe Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <article
              key={plan.id}
              className="rounded-xl border border-[var(--accent)] bg-card p-6 shadow-sm hover:shadow-md transition"
            >

              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-card">
                  {new Date(plan.createdAt).toLocaleString()}
                </p>

                <button
                  type="button"
                  onClick={() => handleDelete(plan.id)}
                  className="rounded-md border border-red-400 px-3 py-1 text-xs text-red-400 hover:bg-red-400/10 transition"
                >
                  Delete
                </button>
              </div>

              {/* Prompt */}
              <div className="rounded-lg border border-[var(--accent)]/40 bg-[var(--accent)]/5 p-4 mb-4">
                <p className="text-xs text-card mb-1 uppercase tracking-wide">
                  Prompt
                </p>
                <p className="text-theme text-sm whitespace-pre-wrap">
                  {plan.userPrompt}
                </p>
              </div>

              {/* AI Response */}
              <div className="prose prose-sm max-w-none text-card">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({ children }) => (
                      <h2 className="text-lg font-semibold text-theme mt-4 mb-2">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-base font-semibold text-theme mt-3 mb-1">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => <p className="mb-2">{children}</p>,
                    ul: ({ children }) => (
                      <ul className="list-disc pl-5 mb-2">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal pl-5 mb-2">{children}</ol>
                    ),
                  }}
                >
                  {plan.assistantReply}
                </ReactMarkdown>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AiRecipesPage;