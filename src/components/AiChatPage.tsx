import { useState } from "react";
import { generateRecipe } from "../lib/gemini";
import { BiSend } from "react-icons/bi";
import { GiChefToque } from "react-icons/gi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getFavorites } from "../lib/favorites";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const AiChat = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useFavoritesContext, setUseFavoritesContext] = useState(true);

  const quickPrompts = [
    { label: "15-min meal", text: "Give me a 15-minute dinner recipe." , tone: "quick" as const},
    { label: "High protein", text: "Suggest a high-protein meal idea.", tone: "healthy" as const },
    { label: "Budget meal", text: "Give me a budget-friendly dinner recipe.", tone: "budget" as const },
    { label: "Healthy swap", text: "How can I make my current meal healthier?", tone: "healthy" as const },
  ];

  const handleGenerate = async (
    overrideMessage?: string,
    tone: "balanced" | "quick" | "healthy" | "budget" = "balanced"
  ) => {
    const activePrompt = (overrideMessage ?? prompt).trim();
    if (!activePrompt) return;

    const userPrompt = activePrompt;
    setMessages((prev) => [...prev, { role: "user", content: userPrompt }]);
    setPrompt("");
    setLoading(true);
    setError(null);

    try {
      const favorites = useFavoritesContext
        ? getFavorites().map((item) => item.strMeal)
        : [];

      const res = await generateRecipe({
        message: userPrompt,
        favorites,
        tone,
      });
      setMessages((prev) => [...prev, { role: "assistant", content: res }]);
    } catch (err) {
      console.error(err);
      setError(
        "AI request failed. Check VITE_GEMINI_API_KEY in .env and verify the key is valid."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-0 w-full">
      <div className="w-full bg-theme">
        <div className="w-full px-4 md:px-8 py-6 pb-24 space-y-4">
          {messages.length === 0 && (
            <div className="min-h-[58vh] flex flex-col justify-center items-center text-center px-4">
              <GiChefToque size={56} className="text-[var(--accent)] mb-4" />
              <p className="text-2xl md:text-3xl font-bold text-theme">
                Ask your chef assistant for recipes, substitutions, or quick meal ideas.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {quickPrompts.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    disabled={loading}
                    onClick={() => void handleGenerate(item.text, item.tone)}
                    className="rounded-full border border-[var(--accent)] px-4 py-2 text-sm text-theme hover:bg-[var(--accent)]/10"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`max-w-4xl rounded-xl p-4 border ${
                message.role === "user"
                  ? "ml-auto bg-[var(--accent)]/10 border-[var(--accent)]"
                  : "mr-auto bg-card border-[var(--accent)]"
              }`}
            >
              {message.role === "user" ? (
                <p className="text-theme whitespace-pre-wrap">{message.content}</p>
              ) : (
                <div className="text-card">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ children }) => (
                        <h1 className="text-xl font-bold text-theme mb-2">{children}</h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-lg font-semibold text-theme mb-2">{children}</h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-base font-semibold text-theme mb-1">{children}</h3>
                      ),
                      p: ({ children }) => (
                        <p className="text-card mb-2 whitespace-pre-wrap">{children}</p>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc pl-5 text-card mb-2">{children}</ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal pl-5 text-card mb-2">{children}</ol>
                      ),
                      li: ({ children }) => <li className="mb-1">{children}</li>,
                      strong: ({ children }) => (
                        <strong className="text-theme font-semibold">{children}</strong>
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="max-w-4xl rounded-xl p-4 border mr-auto bg-card border-[var(--accent)]">
              <p className="text-card">Generating recipe...</p>
            </div>
          )}

          {error && (
            <div className="max-w-4xl rounded-xl p-4 border mr-auto bg-card border-red-400">
              <p className="text-red-400">{error}</p>
            </div>
          )}
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-40 w-full px-4 md:px-8 py-2 bg-card shadow-[0_-4px_12px_rgba(0,0,0,0.2)]">
          <div className="mb-2 flex items-center justify-between text-xs text-card">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={useFavoritesContext}
                onChange={(e) => setUseFavoritesContext(e.target.checked)}
                className="accent-[var(--accent)]"
              />
              Use favorites as context
            </label>
          </div>
          <div className="flex items-stretch gap-2">
            <textarea
              placeholder="eggs, tomato, cheese..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void handleGenerate();
                }
              }}
              rows={1}
              className="flex-1 rounded-lg border border-[var(--accent)] bg-theme text-theme p-2 focus:outline-none focus:border-[var(--accent-hover)] resize-none"
            />
            <button
              onClick={() => void handleGenerate()}
              disabled={loading}
              className="rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-theme px-4 md:px-5 flex items-center gap-2 font-semibold disabled:opacity-70"
            >
              <BiSend size={20} />
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiChat;
