import React from "react";
import TodoItem from "./TodoItem";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) =>
  props.todos.length === 0 ? (
    <div className="text-center">
      <span className="text-xl tracking-widest">No Data</span>
    </div>
  ) : (
    <>
      <ul className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2 mt-6">
        {React.Children.toArray(
          props.todos.map((todo) => (
            <TodoItem
              {...todo}
              handleDelete={props.handleDelete}
              handleToggle={props.handleToggle}
            />
          ))
        )}
      </ul>
      {/* <button className="flex mx-auto mt-16 text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">
        Load More
      </button> */}
    </>
  );
