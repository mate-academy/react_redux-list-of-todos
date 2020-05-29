import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.scss';
import { getTodos } from './helpers';
import { Button } from './components/Button';

import {
  startLoading,
  finishLoading,
  isLoading,
  setTodos,
  getError,
  setError,
  setLoaded,
  isLoaded,
} from './store';
import { TodoList } from './components/TodoList';


const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const loaded = useSelector(isLoaded);
  const error = useSelector(getError);


  const loadTodos = async () => {
    dispatch(startLoading());
    try {
      const todos = await getTodos();

      dispatch(setTodos(todos));
      dispatch(setLoaded());
    } catch (err) {
      dispatch(setError(`Oops... Something went wrong: ${err}`));
    }

    dispatch(finishLoading());
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title is-1">Redux list of todos</h1>
        {loading && <progress className="progress is-primary" max="100" />}
        {!loading && !loaded && (
          <Button
            text="Load ToDos"
            className="button"
            handleClick={loadTodos}
          />
        )}
        {loaded && <TodoList />}
        <h2>{error}</h2>
      </div>
    </section>
  );
};

export default App;
