import React from "react";
import Alert from "./Alert";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => (
  <form onSubmit={props.handleTodoSubmit} className="text-gray-600 body-font">
    <div className="container mx-auto">
      <div class="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
        <div class="relative flex-grow w-full">
          <input
            type="text"
            autoFocus
            value={props.currentTodo}
            onChange={props.handleNewTodoChange}
            placeholder="What needs to be done?"
            className="w-full rounded border border-gray-300 dark:bg-gray-900 text-base outline-none text-gray-700 dark:text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <button className="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">
          Add
        </button>
      </div>
        <Alert error={props.error} />
    </div>
  </form>
);
