import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from './api/api';
import './App.scss';
import { startLoading, finishLoading } from './store/loading';
import { loadingTodos } from './store/todos';
import { TodoList } from './TodoList';
import * as selectors from './store/index';


const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectors.isLoading);
  const isVisible = useSelector(selectors.isVisible);

  const loadTodos = () => {
    dispatch(startLoading());
    getTodos()
      .then(data => dispatch(loadingTodos(data)))
      .finally(() => {
        dispatch(finishLoading());
      });
  };

  return (
    <div className="App">
      <h1>Redux list of todos</h1>
      <div className="container">
        {!isVisible
          && (
            <button
              type="button"
              className="button"
              onClick={loadTodos}
            >
              Load Todos
            </button>
          )}
        {isLoading
          ? <div className="loader" />
          : (isVisible
          && <TodoList />
          )}

      </div>
    </div>
  );
};

export default App;
