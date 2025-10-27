import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import "./IngredientList.css";

const IngredientList = ({
  ingredients,
  onAddIngredient,
  onRemoveIngredient,
  setIngredients,
}) => {
  const { colors } = useTheme();
  const [newIngredient, setNewIngredient] = useState("");

  const handleAddIngredient = () => {
    if (newIngredient.trim() !== "") {
      onAddIngredient(newIngredient.trim());
      setNewIngredient("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddIngredient();
    }
  };

  return (
    <div
      className="ingredient-sidebar h-100"
      style={{
        backgroundColor: colors.secondary,
        color: colors.text,
      }}
    >
      <div className="sidebar-content p-3">
        <h3 className="sidebar-title mb-4">My Pantry</h3>

        {/* Add Ingredient Section */}
        <div className="add-ingredient-section mb-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control add-input"
              placeholder="Add an ingredient..."
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{
                backgroundColor: colors.background,
                color: colors.text,
                border: `2px solid ${colors.accent}`,
              }}
            />
            <button
              className="btn add-btn"
              onClick={handleAddIngredient}
              style={{
                backgroundColor: colors.accent,
                color: colors.text,
                border: `2px solid ${colors.accent}`,
              }}
            >
              Add
            </button>
          </div>
        </div>

        {/* Ingredients List */}
        <div className="ingredients-list-section">
          <h5 className="ingredients-count mb-3">
            Ingredients ({ingredients.length})
          </h5>

          {ingredients.length === 0 ? (
            <div className="empty-state text-center py-4">
              <div className="empty-icon mb-2">🥑</div>
              <p className="empty-text">No ingredients yet</p>
              <small className="empty-subtext">
                Add ingredients to find recipes!
              </small>
            </div>
          ) : (
            <div className="ingredients-grid">
              {ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="ingredient-item"
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.text,
                  }}
                >
                  <span className="ingredient-name">{ingredient}</span>
                  <button
                    onClick={() => onRemoveIngredient(index)}
                    className="remove-btn"
                    style={{
                      backgroundColor: colors.accent,
                      color: colors.text,
                    }}
                    aria-label={`Remove ${ingredient}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Add Suggestions */}
        <div className="quick-add-section mt-4">
          <h6 className="quick-add-title mb-2">Quick Add:</h6>
          <div className="quick-add-buttons">
            {["Tomato", "Onion", "Garlic", "Eggs", "Chicken", "Pasta"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => {
                    onAddIngredient(item);
                  }}
                  className="quick-add-btn"
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.text,
                    border: `1px solid ${colors.accent}`,
                  }}
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientList;
