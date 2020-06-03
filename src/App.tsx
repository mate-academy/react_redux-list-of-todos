import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.scss';
import { TodoList } from './components/TodoList';
import { getPreparedData } from './helpers/api';
import {
  setIsLoaded,
  setIsLoading,
  setTodos,
  getloading,
  getloaded,
  getTodos,
} from './store';

const App = () => {
  // const message = useSelector(getMessage) || 'Ready!';
  const dispatch = useDispatch();
  const todos = useSelector(getTodos);
  const isLoading = useSelector(getloading);
  const isLoaded = useSelector(getloaded);

  const loadData = async () => {
    dispatch(setIsLoading());

    getPreparedData()
      .then(data => {
        dispatch(setTodos(data as Todo[]));
        dispatch(setIsLoaded());
      })
      .finally(() => dispatch(setIsLoading()));
  };

  return (
    <div className="App">
      <div className="wrapper">
        <h1>Redux list of todos</h1>
        {!isLoaded
        && (
          <button
            type="button"
            disabled={isLoading}
            className="button waves-effect waves-light btn mgb20"
            onClick={loadData}
          >
            {isLoading ? 'Loading...' : 'load todos'}
          </button>
        )}
        {isLoaded && (
          <TodoList todos={todos} />
        )}
      </div>
    </div>
  );
};

export default App;
