import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPreparedTodos } from './helpers/api';
import { TodoList } from './components/TodoList';
import './App.scss';

import {
  isLoading,
  getTodos,
  startLoading,
  finishLoading,
  sortTodo,
  loadSortButtons,
} from './store';

const App = () => {
  const loading = useSelector(isLoading);
  const todos = useSelector(getTodos);
  const isLoadSortButtons = useSelector(loadSortButtons);
  const dispatch = useDispatch();

  const downloadTodos = () => {
    dispatch(startLoading());
    getPreparedTodos()
      .then(todo => dispatch(finishLoading(todo)));
  };

  const sortByTitle = () => {
    dispatch(sortTodo([...todos].sort((a, b) => a.title.localeCompare(b.title))));
  };

  const sortByUserName = () => {
    dispatch(sortTodo([...todos].sort((a, b) => a.user.name.localeCompare(b.user.name))));
  };

  const sortByStatus = () => {
    dispatch(sortTodo([...todos].sort((a, b) => +a.completed - +b.completed)));
  };

  return (
    <div className="App">
      <h1>Redux list of todos</h1>
      {isLoadSortButtons
        ? (
          <div className="todo__button">
            <button type="button" className="btn btn-info" onClick={sortByTitle}>Sort By Title</button>
            <button type="button" className="btn btn-info" onClick={sortByUserName}>Sort By Name</button>
            <button type="button" className="btn btn-info" onClick={sortByStatus}>Sort By Status</button>
          </div>
        )
        : (
          <button
            type="button"
            className="btn btn-primary"
            onClick={downloadTodos}
          >
            Load ToDos
          </button>
        )}
      {loading
        ? 'Loading...'
        : <TodoList todos={todos} />}
    </div>
  );
};

export default App;
