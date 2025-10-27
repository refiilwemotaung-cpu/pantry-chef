import React from "react";
import { useTheme } from "../../context/ThemeContext";
import RecipeCard from "../RecipeCard/RecipeCard";
import "./RecipeList.css";

// Sample recipe data
const sampleRecipes = [
  {
    id: 1,
    name: "Vegetable Stir Fry",
    emoji: "🍲",
    time: "20 min",
    difficulty: "Easy",
    ingredients: [
      "bell pepper",
      "broccoli",
      "carrot",
      "soy sauce",
      "garlic",
      "ginger",
    ],
  },
  {
    id: 2,
    name: "Classic Omelette",
    emoji: "🍳",
    time: "10 min",
    difficulty: "Easy",
    ingredients: ["eggs", "cheese", "milk", "butter", "salt", "pepper"],
  },
  {
    id: 3,
    name: "Pasta Carbonara",
    emoji: "🍝",
    time: "25 min",
    difficulty: "Medium",
    ingredients: [
      "pasta",
      "eggs",
      "bacon",
      "parmesan",
      "garlic",
      "black pepper",
    ],
  },
  {
    id: 4,
    name: "Greek Salad",
    emoji: "🥗",
    time: "15 min",
    difficulty: "Easy",
    ingredients: [
      "tomato",
      "cucumber",
      "red onion",
      "feta cheese",
      "olives",
      "olive oil",
    ],
  },
  {
    id: 5,
    name: "Chicken Curry",
    emoji: "🍛",
    time: "40 min",
    difficulty: "Medium",
    ingredients: [
      "chicken",
      "onion",
      "garlic",
      "curry powder",
      "coconut milk",
      "rice",
    ],
  },
  {
    id: 6,
    name: "Chocolate Chip Cookies",
    emoji: "🍪",
    time: "30 min",
    difficulty: "Easy",
    ingredients: [
      "flour",
      "butter",
      "sugar",
      "eggs",
      "chocolate chips",
      "vanilla extract",
    ],
  },
];

const RecipeList = ({ ingredients }) => {
  const { colors } = useTheme();

  // Use the actual ingredients from props instead of hardcoded array
  const availableIngredients = ingredients.map((ingredient) =>
    ingredient.toLowerCase()
  );

  // Filter and sort recipes based on available ingredients
  const filteredRecipes = sampleRecipes
    .map((recipe) => {
      const matchedIngredients = recipe.ingredients.filter((ingredient) =>
        availableIngredients.includes(ingredient.toLowerCase())
      ).length;

      return {
        ...recipe,
        matchedIngredients,
        matchPercentage: (matchedIngredients / recipe.ingredients.length) * 100,
      };
    })
    .sort((a, b) => b.matchPercentage - a.matchPercentage);

  const canMakeRecipes = filteredRecipes.filter(
    (recipe) => recipe.matchedIngredients === recipe.ingredients.length
  );
  const partialMatchRecipes = filteredRecipes.filter(
    (recipe) =>
      recipe.matchedIngredients > 0 &&
      recipe.matchedIngredients < recipe.ingredients.length
  );

  return (
    <div
      className="recipe-main h-100"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
      }}
    >
      <div className="recipe-container p-4">
        {/* Header Stats */}
        <div className="recipe-header mb-4">
          <h2 className="recipe-title">Recipes You Can Make</h2>
          <div className="recipe-stats">
            <div
              className="stat-card"
              style={{
                backgroundColor: colors.card,
                border: `2px solid ${colors.primary}`,
              }}
            >
              <span className="stat-number">{canMakeRecipes.length}</span>
              <span className="stat-label">Ready to Cook</span>
            </div>
            <div
              className="stat-card"
              style={{
                backgroundColor: colors.card,
                border: `2px solid ${colors.accent}`,
              }}
            >
              <span className="stat-number">{partialMatchRecipes.length}</span>
              <span className="stat-label">Partial Matches</span>
            </div>
            <div
              className="stat-card"
              style={{
                backgroundColor: colors.card,
                border: `2px solid ${colors.secondary}`,
              }}
            >
              <span className="stat-number">{ingredients.length}</span>
              <span className="stat-label">My Ingredients</span>
            </div>
          </div>
        </div>

        {/* Can Make Section */}
        {canMakeRecipes.length > 0 && (
          <section className="recipe-section mb-5">
            <h4 className="section-title">
              🍳 Complete Matches ({canMakeRecipes.length})
              <span className="section-subtitle">
                You have all ingredients!
              </span>
            </h4>
            <div className="recipes-grid">
              {canMakeRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  matchedIngredients={recipe.matchedIngredients}
                  availableIngredients={availableIngredients}
                />
              ))}
            </div>
          </section>
        )}

        {/* Partial Matches Section */}
        {partialMatchRecipes.length > 0 && (
          <section className="recipe-section">
            <h4 className="section-title">
              🔍 Partial Matches ({partialMatchRecipes.length})
              <span className="section-subtitle">Missing some ingredients</span>
            </h4>
            <div className="recipes-grid">
              {partialMatchRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  matchedIngredients={recipe.matchedIngredients}
                  availableIngredients={availableIngredients}
                />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {filteredRecipes.length === 0 && ingredients.length > 0 && (
          <div className="empty-recipes text-center py-5">
            <div className="empty-icon mb-3" style={{ fontSize: "4rem" }}>
              🔍
            </div>
            <h4>No matching recipes found</h4>
            <p className="empty-text">
              Try adding more ingredients to find matching recipes!
            </p>
          </div>
        )}

        {/* No Ingredients State */}
        {ingredients.length === 0 && (
          <div className="empty-recipes text-center py-5">
            <div className="empty-icon mb-3" style={{ fontSize: "4rem" }}>
              🥑
            </div>
            <h4>Your pantry is empty</h4>
            <p className="empty-text">
              Add some ingredients to the left to see recipes you can make!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeList;
