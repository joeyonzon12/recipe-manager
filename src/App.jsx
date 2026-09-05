import { useEffect, useState } from "react";

import RecipeForm from "./components/RecipeForm";
import CategoryFilter from "./components/CategoryFilter";
import RecipeList from "./components/RecipeList";
import SummaryBar from "./components/SummaryBar";

const STARTER_RECIPES = [
  { id: 1, title: "Chicken Adobo", category: "Dinner", time: 45, favorite: false },
  { id: 2, title: "Beef Tapa", category: "Breakfast", time: 20, favorite: false },
  { id: 3, title: "Pancit Canton", category: "Lunch", time: 25, favorite: false },
  { id: 4, title: "Leche Flan", category: "Dessert", time: 60, favorite: false },
  { id: 5, title: "Tocino Silog", category: "Breakfast", time: 15, favorite: false },
  { id: 6, title: "Kare-Kare", category: "Dinner", time: 90, favorite: false },
];

export default function App() {
  // Recipes state
  const [recipes, setRecipes] = useState(() => {
    const saved = localStorage.getItem("recipes");

    return saved ? JSON.parse(saved) : STARTER_RECIPES;
  });

  // Filter state
  const [filter, setFilter] = useState(() => {
    return localStorage.getItem("filter") || "All";
  });

  // Save recipes to localStorage whenever recipes change
  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  // Save filter to localStorage whenever filter changes
  useEffect(() => {
    localStorage.setItem("filter", filter);
  }, [filter]);

  // Update browser title with favorite count
  useEffect(() => {
    const favoriteCount = recipes.filter(
      (recipe) => recipe.favorite
    ).length;

    document.title = `Recipes · ${favoriteCount} ★`;
  }, [recipes]);

  // Add recipe
  const handleAdd = (recipe) => {
    const newRecipe = {
      ...recipe,
      id: Date.now(),
      favorite: false,
    };

    setRecipes((currentRecipes) => [
      ...currentRecipes,
      newRecipe,
    ]);
  };

  // Toggle favorite
  const handleToggleFavorite = (id) => {
    setRecipes((currentRecipes) =>
      currentRecipes.map((recipe) =>
        recipe.id === id
          ? {
              ...recipe,
              favorite: !recipe.favorite,
            }
          : recipe
      )
    );
  };

  // Delete recipe
  const handleDelete = (id) => {
    setRecipes((currentRecipes) =>
      currentRecipes.filter((recipe) => recipe.id !== id)
    );
  };

  // Count favorites
  const favoriteCount = recipes.filter(
    (recipe) => recipe.favorite
  ).length;

  // Filter recipes
  const visibleRecipes =
    filter === "All"
      ? recipes
      : recipes.filter(
          (recipe) => recipe.category === filter
        );

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl font-bold">
            Recipe Manager
          </h1>

          <p className="text-base-content/70 mt-2">
            Your personal collection of favorite dishes
          </p>
        </header>

        {/* Add Recipe */}
        <RecipeForm onAdd={handleAdd} />

        {/* Summary */}
        <SummaryBar
          total={recipes.length}
          favorites={favoriteCount}
        />

        {/* Category Filter */}
        <CategoryFilter
          activeFilter={filter}
          onFilterChange={setFilter}
        />

        {/* Recipe List */}
        <RecipeList
          recipes={visibleRecipes}
          onToggleFavorite={handleToggleFavorite}
          onDelete={handleDelete}
        />

      </div>
    </div>
  );
}
