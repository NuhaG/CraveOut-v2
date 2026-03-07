import { useEffect, useState } from "react";
import InstructionCard from "./Instructions";
import RecipeCard from "./RecipeCard";
import {
  favoritesUpdatedEvent,
  getFavorites,
  toggleFavorite,
  type FavoriteRecipe,
} from "../lib/favorites";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<FavoriteRecipe | null>(null);

  const syncFavorites = () => {
    setFavorites(getFavorites());
  };

  useEffect(() => {
    syncFavorites();
    window.addEventListener(favoritesUpdatedEvent, syncFavorites);
    return () => window.removeEventListener(favoritesUpdatedEvent, syncFavorites);
  }, []);

  const handleToggleFavorite = (recipe: FavoriteRecipe) => {
    toggleFavorite(recipe);
    syncFavorites();
    if (selectedRecipe?.idMeal === recipe.idMeal) {
      setSelectedRecipe(null);
    }
  };

  return (
    <section className="py-20 px-4 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[var(--accent)]">
        Your Favorites
      </h1>

      {favorites.length === 0 ? (
        <p className="text-center text-card">
          No favorites yet. Add meals using the heart icon.
        </p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6 sm:flex-row flex-col items-center">
          {favorites.map((recipe) => (
            <div key={recipe.idMeal} className="w-64">
              <RecipeCard
                id={recipe.idMeal}
                name={recipe.strMeal}
                img={recipe.strMealThumb}
                isFavorite
                onToggleFavorite={() => handleToggleFavorite(recipe)}
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

export default FavoritesPage;
