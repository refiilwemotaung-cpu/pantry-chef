import React from "react";
import { useTheme } from "../../context/ThemeContext";

const IngredientList = () => {
  const { colors } = useTheme();

  return (
    <div
      className="h-100 p-3"
      style={{
        backgroundColor: colors.secondary,
        color: colors.text,
      }}
    >
      <h3>My Pantry</h3>
      <p>Ingredient list coming soon...</p>
    </div>
  );
};

export default IngredientList;
