import { useEffect, useState } from "react";
import About from "./components/About";
import AiChatPage from "./components/AiChatPage";
import Categories from "./components/Categories";
import Donate from "./components/Donate";
import FavoritesPage from "./components/FavoritesPage";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import TrendingRecipes from "./components/TrendingRecipes";

const App = () => {
  const [view, setView] = useState<"home" | "favorites" | "ai-chat">("home");

  const handleNavigate = (nextView: "home" | "favorites" | "ai-chat") => {
    setView(nextView);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const titles: Record<typeof view, string> = {
      home: "CraveOut",
      favorites: "CraveOut | Favorites",
      "ai-chat": "CraveOut | AI Chat",
    };
    document.title = titles[view];
  }, [view]);

  return (
    <div className="min-h-screen bg-theme text-theme overflow-x-hidden scroll-pt-[80px] scroll-smooth">
      <div className="w-full fixed top-0 z-50">
        <Navbar currentView={view} onNavigate={handleNavigate} />
      </div>

      <div className="pt-[48px]">
        {view === "home" ? (
          <>
            <Hero />
            <TrendingRecipes />
            <Categories />
            <Donate />
            <About />
          </>
        ) : view === "favorites" ? (
          <FavoritesPage />
        ) : (
          <AiChatPage />
        )}
        <Footer />
      </div>
    </div>
  );
};

export default App;
