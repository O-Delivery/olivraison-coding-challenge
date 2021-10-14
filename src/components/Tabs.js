import React from "react";
import { Link } from "react-router-dom";
import TodoList from "./TodoList";

const Tabs = ({ color, openTab, todos, handleDelete, handleToggle }) => {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center border rounded">
              <Link
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === "/"
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white dark:bg-gray-900")
                }
                data-toggle="tab"
                to="/"
                role="tablist"
              >
                All {openTab === "/" && todos.length}
              </Link>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center border rounded">
              <Link
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === "/active"
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white dark:bg-gray-900")
                }
                data-toggle="tab"
                to="/active"
                role="tablist"
              >
                Active {openTab === "/active" && todos.length}
              </Link>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center border rounded">
              <Link
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === "/completed"
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white dark:bg-gray-900")
                }
                data-toggle="tab"
                to="/completed"
                role="tablist"
              >
                Completed {openTab === "/completed" && todos.length}
              </Link>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words dark:bg-gray-900 bg-white w-full mb-6 border dark:border-gray-300 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === "/" ? "block" : "hidden"} id="all">
                  <TodoList
                    todos={todos}
                    handleDelete={handleDelete}
                    handleToggle={handleToggle}
                  />
                </div>
                <div
                  className={openTab === "/active" ? "block" : "hidden"}
                  id="active"
                >
                  <TodoList
                    todos={todos}
                    handleDelete={handleDelete}
                    handleToggle={handleToggle}
                  />
                </div>
                <div
                  className={openTab === "/completed" ? "block" : "hidden"}
                  id="completed"
                >
                  <TodoList
                    todos={todos}
                    handleDelete={handleDelete}
                    handleToggle={handleToggle}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function TabsRender({
  openTab,
  todos,
  handleDelete,
  handleToggle,
}) {
  return (
    <Tabs
      color="blue"
      openTab={openTab}
      todos={todos}
      handleDelete={handleDelete}
      handleToggle={handleToggle}
    />
  );
}
