import { useEffect, useState } from "react";
import InstructionCard from "./Instructions";
import RecipeCard from "./RecipeCard";
import {
  favoritesUpdatedEvent,
  getFavorites,
  toggleFavorite,
} from "../lib/favorites";
import RecipeSkeleton from "./RecipeSkeleton";

type Category = {
  strCategory: string;
};

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type MealLookupResponse = {
  meals?: Array<{
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
  }>;
};

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [mealsLoading, setMealsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<
    (Meal & { strInstructions: string }) | null
  >(null);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const syncFavorites = () => {
    setFavoriteIds(getFavorites().map((item) => item.idMeal));
  };

  // Fetch categories
  useEffect(() => {
    setCategoriesLoading(true);
    setError(null);
    syncFavorites();
    window.addEventListener(favoritesUpdatedEvent, syncFavorites);

    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories))
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setError("Couldn't load categories.");
      })
      .finally(() => setCategoriesLoading(false));

    return () => window.removeEventListener(favoritesUpdatedEvent, syncFavorites);
  }, []);

  // Fetch meals for selected category
  useEffect(() => {
    if (!selectedCategory) return;
    setMealsLoading(true);
    setError(null);

    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(selectedCategory)}`
    )
      .then((res) => res.json())
      .then((data) => setMeals((data.meals ?? []) as Meal[]))
      .catch((err) => {
        console.error("Error fetching meals:", err);
        setError("Couldn't load meals for this category.");
      })
      .finally(() => setMealsLoading(false));
  }, [selectedCategory]);

  const handleMealClick = async (meal: Meal) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
      );
      const data = (await response.json()) as MealLookupResponse;
      const detail = data.meals?.[0];

      setSelectedMeal({
        ...meal,
        strInstructions: detail?.strInstructions?.trim() ?? "",
      });
    } catch (err) {
      console.error("Error loading meal instructions:", err);
      setSelectedMeal({
        ...meal,
        strInstructions: "",
      });
    }
  };

  return (
    <section id="categories" className="px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[var(--accent)]">
        Explore Categories
      </h1>

      <div className="flex flex-wrap justify-center gap-5 sm:flex-row flex-col items-center">
        {categoriesLoading && (
          <div className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <RecipeSkeleton key={i} />
            ))}
          </div>
        )}
        {!categoriesLoading && categories.map((cat) => (
          <div key={cat.strCategory}>
            <button
              onClick={() => setSelectedCategory(cat.strCategory)}
              className="text-lg py-2 px-6 rounded-lg bg-card hover:scale-105 duration-300 cursor-pointer"
            >
              {cat.strCategory}
            </button>
          </div>
        ))}
      </div>
      {error && <p className="text-center mt-6 text-red-400">{error}</p>}

      {selectedCategory && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-center mb-6 text-theme">
            {selectedCategory} Recipe Ideas
          </h2>

          <div className="flex flex-wrap justify-center gap-6">
            {mealsLoading ?
              <div className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <RecipeSkeleton key={i} />
                ))}
              </div> : meals.map((meal) => (
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
                    })
                  }
                  onClick={() => void handleMealClick(meal)}
                />
              ))}
          </div>
        </div>
      )}

      {selectedMeal && (
        <InstructionCard
          name={selectedMeal.strMeal}
          img={selectedMeal.strMealThumb}
          instructions={selectedMeal.strInstructions}
          onClose={() => setSelectedMeal(null)}
        />
      )}
    </section>
  );
};

export default Categories;
