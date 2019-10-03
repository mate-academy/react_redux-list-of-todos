import React from 'react';
import './App.css';

import { TodoList } from '../TodoList';

class App extends React.Component {
  // state = {
  //   isLoading: false,
  // }

  loadAllTodos = () => {
    const { getTodos } = this.props;
    console.log('test');
    // this.setState({ isLoading: true });
    getTodos();
    // this.setState({ isLoading: false });
  }

  render() {
    // const { isLoading } = this.state;
    const {
      todos,
      sortTodos,
      resetTodos,
      isLoading,
      getTodos,
    } = this.props;

    if (isLoading) {
      return <p className="loading-text">TODOs are loading now...</p>;
    }

    if (todos.length === 0) {
      return (
        <button
          onClick={getTodos}
          type="button"
          className="data-button"
        >
        Load all todos
        </button>
      );
    }

    return (
      <section className="section-wrapper">
        <div className="app">
          <h1 className="main-title">Static list of todos</h1>

          <p className="title">
            <span>TODOs: </span>
            {todos.length}
          </p>
          <button
            type="button"
            onClick={sortTodos}
            className="sort-button"
          >
            Press to sort by title
          </button>
          <button
            type="button"
            className="reset-button"
            onClick={resetTodos}
          >
            Press to reset
          </button>
          <TodoList />
        </div>
      </section>
    );
  }
}

export default App;
