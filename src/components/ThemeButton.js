import React, { useContext } from "react";

import { ThemeContext } from "../context/ThemeContext";
import Moon from "./icons/Moon";
import Sun from "./icons/Sun";

function ThemeButton() {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={changeTheme}
      id="themeButton"
      class="fixed z-10 p-3 dark:bg-gray-900 dark:text-white bg-gray-100 border rounded-full shadow-md bottom-10 right-10"
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
}

export default ThemeButton;
