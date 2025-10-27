import React from "react";
import { useTheme } from "../../context/ThemeContext";
import "./RecipeCard.css";

const RecipeCard = ({ recipe, matchedIngredients, availableIngredients }) => {
  const { colors } = useTheme();

  // Calculate match percentage
  const matchPercentage = Math.round(
    (matchedIngredients / recipe.ingredients.length) * 100
  );

  // Check if recipe can be made with available ingredients
  const canMake = matchedIngredients === recipe.ingredients.length;

  return (
    <div
      className="recipe-card"
      style={{
        backgroundColor: colors.card,
        border: `2px solid ${canMake ? colors.primary : colors.accent}`,
        boxShadow: `0 4px 15px ${
          canMake ? "rgba(162, 219, 203, 0.3)" : "rgba(255, 204, 180, 0.3)"
        }`,
      }}
    >
      {/* Recipe Image/Emoji */}
      <div
        className="recipe-emoji"
        style={{
          backgroundColor: canMake ? colors.primary : colors.accent,
        }}
      >
        {recipe.emoji}
      </div>

      {/* Recipe Info */}
      <div className="recipe-info">
        <h5 className="recipe-title">{recipe.name}</h5>

        {/* Match Indicator */}
        <div className="match-indicator">
          <div className="match-bar">
            <div
              className="match-fill"
              style={{
                width: `${matchPercentage}%`,
                backgroundColor: canMake ? colors.primary : colors.secondary,
              }}
            ></div>
          </div>
          <span className="match-text">
            {matchedIngredients}/{recipe.ingredients.length} ingredients
            {canMake && <span className="can-make-badge"> ✓ Can Make</span>}
          </span>
        </div>

        {/* Recipe Details */}
        <div className="recipe-details">
          <span className="recipe-time">⏱ {recipe.time}</span>
          <span className="recipe-difficulty">📊 {recipe.difficulty}</span>
        </div>

        {/* Ingredients List */}
        <div className="ingredients-preview">
          <h6>Ingredients:</h6>
          <div className="ingredients-tags">
            {recipe.ingredients.map((ingredient, index) => (
              <span
                key={index}
                className={`ingredient-tag ${
                  availableIngredients.includes(ingredient.toLowerCase())
                    ? "available"
                    : "missing"
                }`}
                style={{
                  backgroundColor: availableIngredients.includes(
                    ingredient.toLowerCase()
                  )
                    ? colors.primary
                    : "rgba(255, 255, 255, 0.1)",
                  color: colors.text,
                }}
              >
                {ingredient}
                {availableIngredients.includes(ingredient.toLowerCase()) &&
                  " ✓"}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          className={`view-recipe-btn ${
            canMake ? "can-make" : "missing-ingredients"
          }`}
          style={{
            backgroundColor: canMake ? colors.primary : colors.secondary,
            color: colors.text,
          }}
        >
          {canMake ? "Start Cooking 🍳" : "View Recipe 👀"}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
