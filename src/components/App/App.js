import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { TodoList } from '../TodoList/index';

const App = ({
  getTodos,
  isLoading,
  sortTodos,
  isSorted,
  selectedSort,
  isLoaded,
}) => (
  <div className="App">
    <h1 className="title">Dynamic list of todos</h1>
    {(isLoaded && (
      <>
        Sort by:
        {' '}
        <select
          type="button"
          value={selectedSort}
          onChange={(e) => {
            sortTodos(e.target.value);
          }}
          className="mb-3"
        >
          <option value="Do not sort">Do not sort</option>
          <option value="By user name">By user name</option>
          <option value="By title">By title</option>
          <option value="TODO/Completed">TODO/Completed</option>
        </select>
        <TodoList />
      </>
    ))
      || (isLoading && (
        <button type="button">
          loading...
        </button>
      ))
      || (
        <button type="button" onClick={getTodos}>
          Get todos
        </button>
      )
    }
  </div>
);

App.propTypes = {
  getTodos: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  sortTodos: PropTypes.func.isRequired,
  isSorted: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  selectedSort: PropTypes.string.isRequired,
};

export default App;
