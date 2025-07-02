import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import RecipeCard from "./RecipeCard";
import InstructionCard from "./Instructions";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
};

type MealResponse = {
  meals: Meal[] | null;
};

const Hero = () => {
  const [name, setName] = useState("");
  const [recipe, setRecipe] = useState<MealResponse | null>(null);
  const [selected, setSelected] = useState<Meal | null>(null);

  const handleSearch = async () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/food.png')" }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-theme/60 backdrop-brightness-60"></div>

      {/* Hero Content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen text-center px-4 text-theme">
        <div className="max-w-3xl mx-auto px-6 py-8 rounded-xl bg-[var(--bg)]/40 backdrop-blur-lg shadow-md">
          <h1 className="font-bold text-5xl md:text-7xl">
            Welcome to Crave Out
          </h1>
          <h3 className="mt-4 md:mt-6 text-xl md:text-2xl font-medium text-[var(--accent-hover)]">
            Your Ultimate Destination for Delicious Recipes
          </h3>
          <p className="text-card mt-4 hidden sm:block max-w-2xl mx-auto font-medium">
            Discover the best recipes from around the world. Whether you're a
            seasoned chef or a home cook, we have something for everyone.
          </p>

          {/* Search Input */}
          <div className="flex justify-center items-center mt-6 md:mt-10 mx-auto w-full">
            <input
              type="text"
              name="Recipe"
              placeholder="Search Your Next Recipe..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="rounded-l-lg p-2 md:p-4 text-md w-[70%] border-2 border-[var(--accent)] focus:outline-none focus:border-[var(--accent-hover)]"
            />
            <button
              className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] rounded-r-lg p-2 md:p-4 flex items-center justify-center"
              onClick={handleSearch}
            >
              <BiSearch size={24} />
            </button>
          </div>

          {/* Search Results */}
          {recipe && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2">Search Result</h2>
              {recipe.meals ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {recipe.meals.map((meal) => (
                    <RecipeCard
                      key={meal.idMeal}
                      name={meal.strMeal}
                      img={meal.strMealThumb}
                      onClick={() => setSelected(meal)}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-theme">No recipes found.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Instructions Card */}
      {selected && (
        <InstructionCard
          name={selected.strMeal}
          img={selected.strMealThumb}
          instructions={selected.strInstructions}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
};

export default Hero;
