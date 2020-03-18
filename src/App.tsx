import React, { FC } from 'react';
import { connect } from 'react-redux';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import {
  State,
  filterByTitle,
  filterByName,
  filterByComplete,
  loadTodos,
} from './store';

interface Props {
  todos: TodoWithUser[] | [];
  isLoading: boolean;
  setFilterByTitle: () => void;
  setFilterByName: () => void;
  setFilterByCompleted: () => void;
  loadedTodos: () => void;
}

const App: FC<Props> = (props) => {
  const {
    loadedTodos,
    todos,
    isLoading,
    setFilterByTitle,
    setFilterByName,
    setFilterByCompleted,
  } = props;

  const handleStart = () => {
    loadedTodos();
  };

  if (!todos.length) {
    return (
      <div className="app">
        <button
          className="button is-info"
          type="button"
          onClick={handleStart}
        >
          {isLoading ? 'Loading....' : 'Add'}
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="buttons-box">
        <button
          className="button is-info"
          type="button"
          onClick={setFilterByTitle}
        >
          Filter Title
        </button>
        <button
          className="button is-info"
          type="button"
          onClick={setFilterByName}
        >
          Filter Name
        </button>
        <button
          className="button is-info"
          type="button"
          onClick={setFilterByCompleted}
        >
          Filter Completed
        </button>
      </div>
      <TodoList todos={todos} />
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  todos: state.todos,
  isLoading: state.isLoading,
});

const mapDispatchToProps = {
  loadedTodos: loadTodos,
  setFilterByTitle: filterByTitle,
  setFilterByName: filterByName,
  setFilterByCompleted: filterByComplete,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
