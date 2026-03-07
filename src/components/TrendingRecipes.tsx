import { useCallback, useEffect, useRef, useState } from "react";
import RecipeCard from "./RecipeCard";
import InstructionCard from "./Instructions";
import {
  favoritesUpdatedEvent,
  getFavorites,
  toggleFavorite,
} from "../lib/favorites";
import RecipeSkeleton from "./RecipeSkeleton";

type Recipe = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
};

const TrendingRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const hasLoadedOnStart = useRef(false);
  const TRENDING_LIMIT = 12;

  const syncFavorites = () => {
    setFavoriteIds(getFavorites().map((item) => item.idMeal));
  };

  const fetchRecipes = useCallback(async (limit: number) => {
    setLoading(true);
    setError(null);
    try {
      const requests = Array.from({ length: limit }, () =>
        fetch("https://www.themealdb.com/api/json/v1/1/random.php").then(
          (res) => res.json()
        )
      );

      const results = await Promise.all(requests);
      const meals = results
        .map((data) => data.meals?.[0] as Recipe | undefined)
        .filter((meal): meal is Recipe => Boolean(meal));

      // random endpoint can duplicate meals -> keep unique ids for cleaner UI
      const uniqueMeals = Array.from(
        new Map(meals.map((meal) => [meal.idMeal, meal])).values()
      );

      setRecipes(uniqueMeals);
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setError("Couldn't load trending recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedOnStart.current) {
      hasLoadedOnStart.current = true;
      void fetchRecipes(TRENDING_LIMIT);
    }
    syncFavorites();
    window.addEventListener(favoritesUpdatedEvent, syncFavorites);
    return () => window.removeEventListener(favoritesUpdatedEvent, syncFavorites);
  }, [fetchRecipes]);

  return (
    <section id="trending" className="py-16 px-4 bg-[var(--bg)] text-[var(--text)]">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[var(--accent)]">
        Trending Recipes
      </h2>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <RecipeSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="text-center">
          <p className="text-red-400">{error}</p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6 sm:flex-row flex-col items-center">
          {recipes.map((recipe) => (
            <div key={recipe.idMeal} className="w-64">
              <RecipeCard
                id={recipe.idMeal}
                name={recipe.strMeal}
                img={recipe.strMealThumb}
                isFavorite={favoriteIds.includes(recipe.idMeal)}
                onToggleFavorite={() =>
                  toggleFavorite({
                    idMeal: recipe.idMeal,
                    strMeal: recipe.strMeal,
                    strMealThumb: recipe.strMealThumb,
                    strInstructions: recipe.strInstructions,
                  })
                }
                onClick={() => setSelectedRecipe(recipe)}
              />
            </div>
          ))}
        </div>
      )}

      {selectedRecipe && (
        <InstructionCard
          name={selectedRecipe.strMeal}
          img={selectedRecipe.strMealThumb}
          instructions={selectedRecipe.strInstructions}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </section>
  );
};

export default TrendingRecipes;
