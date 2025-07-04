import About from "./components/About";
import Categories from "./components/Categories";
import Donate from "./components/Donate";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import TrendingRecipes from "./components/TrendingRecipes";

const App = () => {
  return (
    <div className="min-h-screen bg-theme text-theme overflow-x-hidden scroll-pt-[80px] scroll-smooth">
      <div className="w-full fixed top-0 z-50">
        <Navbar />
      </div>

      <div className="pt-[48px]">
        <Hero />
        <TrendingRecipes />
        <Categories />
        <Donate />
        <About />
        <Footer />
      </div>
    </div>
  );
};

export default App;
