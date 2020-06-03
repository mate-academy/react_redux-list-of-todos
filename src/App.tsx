import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.scss';
import { TodoList } from './components/TodoList';
import { getPreparedData } from './helpers/api';
import {
  isLoaded,
  isLoading,
  setTodos,
  getloading,
  getloaded,
  getTodos,
} from './store';

const App = () => {
  // const message = useSelector(getMessage) || 'Ready!';
  const dispatch = useDispatch();
  const todos = useSelector(getTodos);
  const loading = useSelector(getloading);
  const loaded = useSelector(getloaded);

  const loadData = async () => {
    dispatch(isLoading());

    getPreparedData()
      .then(data => {
        dispatch(setTodos(data as Todo[]));
        dispatch(isLoaded());
      })
      .finally(() => dispatch(isLoading()));
  };

  return (
    <div className="App">
      <div className="wrapper">
        <h1>Redux list of todos</h1>
        {!loaded
        && (
          <button
            type="button"
            disabled={loading}
            className="button waves-effect waves-light btn mgb20"
            onClick={loadData}
          >
            {loading ? 'Loading...' : 'load todos'}
          </button>
        )}
        {loaded && (
          <TodoList todos={todos} />
        )}
      </div>
    </div>
  );
};

export default App;
