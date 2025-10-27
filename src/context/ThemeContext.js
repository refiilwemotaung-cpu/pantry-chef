import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("pantryChef-theme");
    if (savedTheme) {
      setIsDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("pantryChef-theme", JSON.stringify(newTheme));
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      primary: "#A2DBCB",
      secondary: "#B09FC4",
      accent: "#FFCCB4",
      background: isDarkMode ? "#1a1a2e" : "#ffffff",
      text: isDarkMode ? "#ffffff" : "#333333",
      card: isDarkMode ? "#16213e" : "#f8f9fa",
    },
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
