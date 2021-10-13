import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Footer from "./Footer";
import { saveTodo, loadTodos, destroyTodo, updateTodo } from "../lib/service";
import { filterTodos } from "../lib/utils";

export default class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTodo: "",
      todos: [],
      error: false
    };
    this.handleNewTodoChange = this.handleNewTodoChange.bind(this);
    this.handleTodoSubmit = this.handleTodoSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    loadTodos()
      .then( (response) => {
          this.setState({ todos: response.data });
          // console.log(response.data);
          // console.log(this.state.todos[0]);
        },
        )
      .catch( () => {
        this.setState({ error: true });
        // console.log(this.state.error)
      },
      );
  }

  handleNewTodoChange(evt) {
    this.setState({ currentTodo: evt.target.value });
  }

  handleDelete(id) {
    destroyTodo(id).then(() =>
      this.setState({
        todos: this.state.todos.filter((t) => t.id !== id),
      })
    );
  }

  handleToggle(id) {
    const targetTodo = this.state.todos.find((t) => t.id === id);
    console.log('before: ' + targetTodo.isComplete);
    const updated = {
      ...targetTodo,
      isComplete: !targetTodo.isComplete,
    };
    console.log('after: ' + updated.isComplete);
    updateTodo(updated).then(({ data }) => {
      const todos = this.state.todos.map((t) => (t.id === data.id ? data : t));
      this.setState({ todos: todos });
    });
  }

  handleTodoSubmit(evt) {
    evt.preventDefault();
    const newTodo = { taskName: this.state.currentTodo, isComplete: 0 };
    const todos = this.state.todos;
    saveTodo(newTodo)
      .then( (response) => {
        console.log(response);
        // this.setState( { todos: todos.push(newTodo) });
        this.setState( { currentTodo: "" });
        
        loadTodos()
          .then( (response) => {
            this.setState({ todos: response.data });
          },)    
          .catch( () => {
            this.setState({ error: true });
          },);
          },)
      .catch( () => {
        this.setState({ error: true });
      },);
  }

  render() {
    // console.log("render() called");
    const remaining = this.state.todos.filter((t) => t.isComplete == '0').length;
    // console.log(remaining);
    return (
      <Router>
        <div>
          <header className="header">
            <h1>todos</h1>
            {this.state.error ? <span className="error">Oh no!</span> : null}
            <TodoForm
              currentTodo={this.state.currentTodo}
              handleTodoSubmit={this.handleTodoSubmit}
              handleNewTodoChange={this.handleNewTodoChange}
            />
          </header>
          <section className="main">
            <Route
              path="/:filter?"
              render={({ match }) => (
                <TodoList
                  todos={filterTodos(match.params.filter, this.state.todos)}
                  handleDelete={this.handleDelete}
                  handleToggle={this.handleToggle}
                />
              )}
            />
          </section>
          <Footer remaining={remaining} />
        </div>
      </Router>
    );
  }
}
