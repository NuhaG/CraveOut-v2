import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { TbArrowsShuffle } from "react-icons/tb";
import RecipeCard from "./RecipeCard";
import InstructionCard from "./Instructions";
import {
  favoritesUpdatedEvent,
  getFavorites,
  toggleFavorite,
} from "../lib/favorites";
import RecipeSkeleton from "./RecipeSkeleton";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const syncFavorites = () => {
    setFavoriteIds(getFavorites().map((item) => item.idMeal));
  };

  useEffect(() => {
    syncFavorites();
    window.addEventListener(favoritesUpdatedEvent, syncFavorites);
    return () => window.removeEventListener(favoritesUpdatedEvent, syncFavorites);
  }, []);

  const handleSearch = async () => {
    const query = name.trim();
    if (!query) return;

    setLoading(true);
    setError(null);

    fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
    )
      .then((res) => res.json())
      .then((data: MealResponse) => {
        setRecipe(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Search failed. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  const handleSurpriseMe = async () => {
    setLoading(true);
    setError(null);

    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((res) => res.json())
      .then((data: MealResponse) => {
        const meal = data.meals?.[0] ?? null;
        if (meal) {
          setRecipe({ meals: [meal] });
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Couldn't fetch a random recipe.");
      })
      .finally(() => setLoading(false));
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
            <div className="w-[70%] flex items-center rounded-lg border-2 border-[var(--accent)] overflow-hidden">
              <input
                type="text"
                name="Recipe"
                placeholder="Search Your Next Recipe..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 p-2 md:p-4 text-md bg-transparent focus:outline-none"
              />
              <button
                type="button"
                onClick={handleSurpriseMe}
                disabled={loading}
                aria-label="Random recipe"
                className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] p-2 md:p-4 flex items-center justify-center"
              >
                <TbArrowsShuffle size={24} />
              </button>
              <button
                type="button"
                className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] p-2 md:p-4 flex items-center justify-center"
                onClick={handleSearch}
                disabled={loading}
                aria-label="Search recipes"
              >
                <BiSearch size={24} />
              </button>
            </div>
          </div>

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {Array.from({ length: 2 }).map((_, i) => (
                <RecipeSkeleton key={`hero-skeleton-${i}`} />
              ))}
            </div>
          )}
          {error && <p className="mt-4 text-red-400">{error}</p>}

          {/* Search Results */}
          {recipe && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2">Search Result</h2>
              {recipe.meals ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {recipe.meals.map((meal) => (
                    <RecipeCard
                      key={meal.idMeal}
                      id={meal.idMeal}
                      name={meal.strMeal}
                      img={meal.strMealThumb}
                      isFavorite={favoriteIds.includes(meal.idMeal)}
                      onToggleFavorite={() =>
                        toggleFavorite({
                          idMeal: meal.idMeal,
                          strMeal: meal.strMeal,
                          strMealThumb: meal.strMealThumb,
                          strInstructions: meal.strInstructions,
                        })
                      }
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
