import React from "react";
import { useTheme } from "../../context/ThemeContext";

const RecipeList = () => {
  const { colors } = useTheme();

  return (
    <div
      className="h-100 p-3"
      style={{
        backgroundColor: colors.primary,
        color: colors.text,
      }}
    >
      <h3>Recipes You Can Make</h3>
      <p>Recipe list coming soon...</p>
    </div>
  );
};

export default RecipeList;
