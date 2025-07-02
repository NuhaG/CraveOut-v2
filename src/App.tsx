import About from "./components/About";
import Categories from "./components/Categories";
import Donate from "./components/Donate";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import TrendingRecipes from "./components/TrendingRecipes";

const App = () => {
  return (
    <div className="min-h-screen bg-theme text-theme overflow-x-hidden">
      <div className="w-full z-30">
        <Navbar />
      </div>

      <div>
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
