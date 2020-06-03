import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPreparedTodos } from './api';
import { TodoList } from './components/ToDoList';
import './App.css';

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
  const sortType = ['Name', 'Title', 'Status'];
  const loading = useSelector(isLoading);
  const todos = useSelector(getSortedTodos);
  const loadButtons = useSelector(loadSortButtons);
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

  const handleSort = (sort: string) => {
    return dispatch(sortTodo(sort));
  };

  return (
    <div className="App">
      <h1>Redux list of todos</h1>
      {loadButtons
        ? (
          <div className="todo__button">
            {sortType.map(st => (
              <button type="button" className="btn btn-info" onClick={() => handleSort(st)}>
                Sort By
                {' '}
                {st}
              </button>
            ))}
          </div>
        )
        : (
          <button
            type="button"
            className="btn btn-load"
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
