import React from "react";

function TodoItem(props) {
  return (
    <li className="p-2 sm:w-1/2 w-full relative">
      <div className="bg-gray-100 rounded flex p-4 h-full items-center">
        <div class="bg-white border-1 rounded-2xl border-gray-400 w-7 h-7 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
          <input
            checked={props.isComplete}
            onChange={() => props.handleToggle(props.id)}
            type="checkbox"
            class="opacity-0 absolute"
          />
          <svg
            class="fill-current hidden w-5 h-5 text-green-500 pointer-events-none"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        </div>
        <span className={"title-font font-medium " + (props.isComplete ? "line-through" : "")}>{props.name}</span>
        <button
          className="absolute top-0 bottom-0 right-0 px-6 py-3"
          onClick={() => props.handleDelete(props.id)}
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
