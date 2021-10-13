export const filterTodos = (filter, todos) => {
  console.log(filter);
  console.log(todos);
  if(filter === 'active') {
    return todos.filter((todo) => todo.isComplete == 0);
  } else if (filter === 'completed') {
    return todos.filter((todo) => todo.isComplete == 1);
  } else {
    return todos;
  }
  // return filter ? todos.filter((todo) => todo.isComplete === (filter === "completed")) : todos;
}
