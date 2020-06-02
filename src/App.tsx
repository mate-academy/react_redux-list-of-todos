import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPreparedTodos } from './helpers/api';
import { TodoList } from './components/TodoList';
import './App.scss';

import {
  isLoading,
  getSortedTodos,
  setTodos,
  setError,
  startLoading,
  finishLoading,
  sortTodo,
  loadSortButtons,
} from './store';

const App = () => {
  const loading = useSelector(isLoading);
  const todos = useSelector(getSortedTodos);
  const isLoadSortButtons = useSelector(loadSortButtons);
  const dispatch = useDispatch();

  const downloadTodos = async () => {
    dispatch(startLoading());
    try {
      const data = await getPreparedTodos();

      dispatch(setTodos(data));
    } catch (error) {
      dispatch(setError(`ERROR: ${error}`));
    }

    dispatch(finishLoading());
  };

  const sortByTitle = () => {
    dispatch(sortTodo('title'));
  };

  const sortByUserName = () => {
    dispatch(sortTodo('userName'));
  };

  const sortByStatus = () => {
    dispatch(sortTodo('status'));
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
