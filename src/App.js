import React from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Header from "./components/Header/Header";
import IngredientList from "./components/IngredientList/IngredientList";
import RecipeList from "./components/RecipeList/RecipeList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/globals.css";

function AppContent() {
  const { isDarkMode, colors } = useTheme();

  return (
    <div
      className={`app ${isDarkMode ? "dark" : "light"}`}
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <Header />
      <div className="container-fluid">
        <div className="row" style={{ minHeight: "calc(100vh - 80px)" }}>
          <div className="col-md-4 col-lg-3 p-0">
            <IngredientList />
          </div>
          <div className="col-md-8 col-lg-9 p-0">
            <RecipeList />
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
