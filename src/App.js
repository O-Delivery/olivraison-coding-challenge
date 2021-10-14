import React from "react";

import TodoApp from "./components/TodoApp";
import { AlertProvider } from "./context/AlertContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <AlertProvider>
        <TodoApp />
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
