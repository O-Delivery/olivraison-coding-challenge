import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Footer from "./Footer";
import { saveTodo, loadTodos, destroyTodo, updateTodo } from "../lib/service";
import { filterTodos } from "../lib/utils";

export default function TodoApp1() {
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState("");
  const [error, setError] = useState(false);
  const remaining = todos.filter((t) => !t.isComplete).length;

  useEffect(() => {
    loadTodos()
      .then(({ data }) => setTodos(data))
      .catch(() => setError(true));
  }, []);

  function handleNewTodoChange(evt) {
    setCurrentTodo(evt.target.value);
  }

  function handleDelete(id) {
    destroyTodo(id).then(() => {
      const newTodosList = todos.filter((t) => t.id !== id);
      setTodos(newTodosList);
    });
  }

  function handleToggle(id) {
    const targetTodo = todos.find((t) => t.id === id);
    const updated = {
      ...targetTodo,
      isComplete: !targetTodo.isComplete,
    };
    updateTodo(updated).then(({ data }) => {
      const newTodosList = todos.map((t) => (t.id === data.id ? data : t));
      setTodos(newTodosList);
    });
  }

  function handleTodoSubmit(evt) {
    evt.preventDefault();
    const newTodo = { name: currentTodo, isComplete: false, id: generateUUID() };
    saveTodo(newTodo);
    const newTodosList = todos;
    newTodosList.push(newTodo);
    setTodos(newTodosList);
    setCurrentTodo("");
  }

  return (
    <Router>
      <div>
        <header className="header">
          <h1>todos</h1>
          {error ? <span className="error">Oh no!</span> : null}
          <TodoForm
            currentTodo={currentTodo}
            handleTodoSubmit={handleTodoSubmit}
            handleNewTodoChange={handleNewTodoChange}
          />
        </header>
        <section className="main">
          <Route
            path="/:filter?"
            render={({ match }) => (
              <TodoList
                todos={filterTodos(match.params.filter, todos)}
                handleDelete={handleDelete}
                handleToggle={handleToggle}
              />
            )}
          />
        </section>
        <Footer remaining={remaining} />
      </div>
    </Router>
  );
}

function generateUUID() {
  return (new Date()).getTime();
}