import { useEffect } from "react";
import About from "./components/About";
import AiChatPage from "./components/AiChatPage";
import Categories from "./components/Categories";
import Donate from "./components/Donate";
import FavoritesPage from "./components/FavoritesPage";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import TrendingRecipes from "./components/TrendingRecipes";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "CraveOut",
      "/favorites": "CraveOut | Favorites",
      "/ai-chat": "CraveOut | AI Chat",
    };
    document.title = titles[pathname] ?? "CraveOut";
  }, [pathname]);

  return (
    <div className="min-h-screen bg-theme text-theme overflow-x-hidden scroll-pt-[80px] scroll-smooth">
      <div className="w-full fixed top-0 z-50">
        <Navbar />
      </div>

      <div className="pt-[48px]">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <TrendingRecipes />
                <Categories />
                <Donate />
                <About />
              </>
            }
          />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/ai-chat" element={<AiChatPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {pathname !== "/ai-chat" && <Footer />}
      </div>
    </div>
  );
};

export default App;
