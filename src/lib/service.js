import axios from "axios";

export const saveTodo = (todo) =>
  axios.post("http://localhost:8000/api/task", todo);

export const loadTodos = () => axios.get("http://localhost:8000/api/tasks");

export const destroyTodo = (id) =>
  axios.delete(`http://localhost:8000/api/task/${id}`);

export const updateTodo = (todo) =>
  axios.put(`http://localhost:8000/api/task/${todo.id}`, todo);
