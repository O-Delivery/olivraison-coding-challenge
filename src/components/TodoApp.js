import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TodoForm from "./TodoForm";
import { saveTodo, loadTodos, destroyTodo, updateTodo } from "../lib/service";
import { filterTodos } from "../lib/utils";
import TabsRender from "./Tabs";
import { AlertContext } from "../context/AlertContext";
import ThemeButton from "./ThemeButton";

export default function TodoApp1() {
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState("");
  const [error, setError] = useState(false);
  const { show: showAlert } = useContext(AlertContext);

  useEffect(() => {
    loadTodos()
      .then(({ data }) => setTodos(data))
      .catch(() => setError(true));
  }, []);

  function handleNewTodoChange(evt) {
    setCurrentTodo(evt.target.value);
  }

  function handleDelete(id) {
    destroyTodo(id)
      .then(() => {
        const newTodosList = todos.filter((t) => t.id !== id);
        setTodos(newTodosList);
      })
      .catch(() => setError(true));
  }

  function handleToggle(id) {
    const targetTodo = todos.find((t) => t.id === id);
    const updated = {
      ...targetTodo,
      isComplete: !targetTodo.isComplete,
    };
    updateTodo(updated)
      .then(({ data }) => {
        const newTodosList = todos.map((t) => (t.id === data.id ? data : t));
        setTodos(newTodosList);
      })
      .catch(() => setError(true));
  }

  function handleTodoSubmit(evt) {
    evt.preventDefault();
    if (currentTodo === "") {
      alert("Please fill the input");
      return;
    }
    const newTodo = {
      name: currentTodo,
      isComplete: false,
      id: generateUUID(),
    };
    saveTodo(newTodo).catch(() => setError(true));
    const newTodosList = todos;
    newTodosList.push(newTodo);
    setTodos(newTodosList);
    setCurrentTodo("");
    setError(false);
    showAlert();
  }

  return (
    <Router>
      <section className="text-gray-600 body-font">
        <Route
          path="/:filter?"
          render={({ match }) => (
            <div className="container px-5 py-12 mx-auto">
              <div className="text-center mb-10">
                <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900">
                  Taskter, just tasks.
                </h1>
              </div>
              <TodoForm
                error={error}
                currentTodo={currentTodo}
                handleTodoSubmit={handleTodoSubmit}
                handleNewTodoChange={handleNewTodoChange}
              />
              <TabsRender
                todos={filterTodos(match.params.filter, todos)}
                handleDelete={handleDelete}
                handleToggle={handleToggle}
                openTab={match.url}
              />
            </div>
          )}
        />
      </section>
      <ThemeButton />
    </Router>
  );
}

function generateUUID() {
  return new Date().getTime();
}
