import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";

type Category = {
  strCategory: string;
};

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [meals, setMeals] = useState<Meal[]>([]);

  // Fetch categories
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Fetch meals for selected category
  useEffect(() => {
    if (!selectedCategory) return;

    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
    )
      .then((res) => res.json())
      .then((data) => setMeals(data.meals))
      .catch((err) => console.error("Error fetching meals:", err));
  }, [selectedCategory]);

  return (
    <section id="categories">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[var(--accent)]">
        Explore Categories
      </h1>

      <div className="flex flex-wrap justify-center gap-5 sm:flex-row flex-col items-center">
        {categories.map((cat) => (
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

      {selectedCategory && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-center mb-6 text-theme">
            {selectedCategory} Recipe Ideas
          </h2>

          <div className="flex flex-wrap justify-center gap-6">
            {meals.map((meal) => (
              <CategoryCard
                key={meal.idMeal}
                name={meal.strMeal}
                img={meal.strMealThumb}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Categories;
