import axios from "axios";

export const saveTodo = (todo) =>
  axios.post("http://localhost:8000/todos", todo);

export const loadTodos = () => axios.get("http://localhost:8000/todos");

export const destroyTodo = (id) =>
  axios.delete(`http://localhost:8000/todos/${id}`);

export const updateTodo = (todo) =>
  axios.put(`http://localhost:8000/todos/${todo.id}`, todo);
