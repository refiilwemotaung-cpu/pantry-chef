import React from "react";
import { useTheme } from "../../context/ThemeContext";
import "./Header.css";

const Header = () => {
  const { isDarkMode, toggleTheme, colors } = useTheme();

  return (
    <header
      className="app-header"
      style={{
        backgroundColor: colors.secondary,
        borderBottom: `3px solid ${colors.accent}`,
      }}
    >
      <div className="container-fluid">
        <div className="row align-items-center py-2">
          {/* Logo and Title */}
          <div className="col-6 col-md-4">
            <div className="d-flex align-items-center">
              <div
                className="header-logo me-3"
                style={{ backgroundColor: colors.accent }}
              >
                🏠
              </div>
              <h1 className="header-title m-0" style={{ color: colors.text }}>
                Cupboard Cuisine
              </h1>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile, visible on tablet+ */}
          <div className="col-md-4 d-none d-md-block">
            <div className="search-container">
              <input
                type="text"
                className="form-control search-input"
                placeholder="Search recipes..."
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  border: `2px solid ${colors.primary}`,
                }}
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>

          {/* Theme Toggle and Actions */}
          <div className="col-6 col-md-4">
            <div className="d-flex justify-content-end align-items-center">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="theme-toggle-btn me-3"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.text,
                }}
                aria-label={
                  isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {isDarkMode ? "☀️" : "🌙"}
              </button>

              {/* User Icon - Hidden on mobile */}
              <div
                className="user-icon d-none d-md-flex"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.text,
                }}
              >
                👤
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
