import { useState, useEffect } from "react";

const useDarkMode = () => {
  // Get current theme from local storage
  const [theme, setTheme] = useState(localStorage.theme);

  // Toggle between light and dark mode
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    // Get Root HTML Element
    const root = window.document.documentElement;
    // Add / Remove "dark" & "light" class
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    // Update local storage
    localStorage.setItem("theme", theme);
    // Dependency Array so useEffect only runs on state change
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
};

export default useDarkMode;
