import React from "react";

const TodoItem = (props) => (
  <li className={props.isComplete == '1' ? "completed" : null}>
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        checked={(props.isComplete == 0) ? false : true}
        onChange={() => {
          props.handleToggle(props.id)}}
      />
      <label>{props.taskName}</label>
      <button
        className="destroy"
        onClick={() => props.handleDelete(props.id)}
      />
    </div>
  </li>
);

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  return (<ul className="todo-list">
    {props.todos.map((todo) => (
      <TodoItem
        key={todo.id}
        {...todo}
        handleDelete={props.handleDelete}
        handleToggle={props.handleToggle}
      />
    ))}
  </ul>
)};
