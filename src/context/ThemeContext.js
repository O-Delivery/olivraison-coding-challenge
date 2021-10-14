import React, { useEffect, useState } from "react";

const ThemeContext = React.createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(``);
  const root = window.document.documentElement;

  useEffect(() => {
    loadUserTheme();
  }, []);

  function loadUserTheme() {
    const localStorageTheme = localStorage.getItem("theme");
    if (localStorageTheme) {
      setTheme(localStorageTheme);
      
    } else {
      localStorage.setItem("theme", `light`);
      setTheme(`light`);
    }
  }

  function changeTheme() {
    if(theme === "light") {
      setTheme(`dark`);
      return root.classList.add("dark");
    }
    setTheme(`light`);
    root.classList.remove("dark");
  }

  useEffect(() => {
    localStorage.setItem("theme", theme);

    if(theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");

  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeProvider, ThemeContext };
