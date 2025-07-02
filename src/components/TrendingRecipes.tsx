import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import InstructionCard from "./Instructions";

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
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const requests = Array.from({ length: 20 }, () =>
          fetch("https://www.themealdb.com/api/json/v1/1/random.php").then(
            (res) => res.json()
          )
        );

        // Waits for all the recipes
        const results = await Promise.all(requests);

        const meals: Recipe[] = results.map((data) => data.meals?.[0]);
        setRecipes(meals);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <section id="trending" className="py-16 px-4 bg-[var(--bg)] text-[var(--text)]">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[var(--accent)]">
        Trending Recipes
      </h2>

      {loading ? (
        <h3 className="text-center text-xl text-[var(--card-text)]">
          Loading...
        </h3>
      ) : (
        <div className="flex flex-wrap justify-center gap-6 sm:flex-row flex-col items-center">
          {recipes.map((recipe) => (
            <div key={recipe.idMeal} className="w-64">
              <RecipeCard name={recipe.strMeal} img={recipe.strMealThumb} onClick={() => setSelectedRecipe(recipe)}/>
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
