import React, { useState, useEffect, Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Footer from "./Footer";
import { saveTodo, loadTodos, destroyTodo, updateTodo } from "../lib/service";
import { filterTodos } from "../lib/utils";

export const TodoApp = () => {

  const [todos, setTodos] = useState([]); // fixed
  const [currentTodo, setCurrentTodo] = useState("");
  const [error, setError] = useState("");
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    loadTodos()
      .then(({ data }) => {
        setTodos(data);
        setRemaining(todos.filter((t) => !t.isComplete).length);
      })
      .catch(() => setError(true));
  }, [todos])

  const handleNewTodoChange = (e) => {
    setCurrentTodo(e.target.value);
  }

  const handleDelete = (id) => {
    destroyTodo(id).then(() => {
      setTodos(todos.filter((t) => t.id !== id));
    });
  }

  const handleToggle = (id) => {
    const targetTodo = todos.find((t) => t.id === id);
    const updated = {
      ...targetTodo,
      isComplete: !targetTodo.isComplete,
    };
    updateTodo(updated).then(({ data }) => {
      setTodos(todos.map((t) => (t.id === data.id ? data : t)));
    });
  }

  const handleTodoSubmit = (e) => {
    e.preventDefault();
    const newTodo = { name: currentTodo, isComplete: false };
    // save new todo
    saveTodo(newTodo).then( ({data: todo}) => {
      // update state with newly saved todo
      setTodos([...todos, todo]);
    });
    // reset
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

export default TodoApp;