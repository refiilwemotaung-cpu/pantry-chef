import React, { useState } from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Header from "./components/Header/Header";
import IngredientList from "./components/IngredientList/IngredientList";
import RecipeList from "./components/RecipeList/RecipeList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/globals.css";

function AppContent() {
  const { isDarkMode, colors } = useTheme();
  const [ingredients, setIngredients] = useState([]);

  // Function to add an ingredient
  const addIngredient = (ingredient) => {
    setIngredients((prev) => [...prev, ingredient.toLowerCase()]);
  };

  // Function to remove an ingredient
  const removeIngredient = (index) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  // Function to set ingredients (for quick add)
  const setIngredientsList = (newIngredients) => {
    setIngredients(newIngredients.map((ing) => ing.toLowerCase()));
  };

  return (
    <div
      className={`app ${isDarkMode ? "dark" : "light"}`}
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <Header />
      <div className="container-fluid">
        <div className="row" style={{ minHeight: "calc(100vh - 80px)" }}>
          <div className="col-md-4 col-lg-3 p-0">
            <IngredientList
              ingredients={ingredients}
              onAddIngredient={addIngredient}
              onRemoveIngredient={removeIngredient}
              setIngredients={setIngredientsList}
            />
          </div>
          <div className="col-md-8 col-lg-9 p-0">
            <RecipeList ingredients={ingredients} />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
