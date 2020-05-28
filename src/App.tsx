import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.scss';

import { getTodos, isLoaded, isLoading } from './helpers/selectors';
import { setIsLoaded, setIsLoading, setTodos } from './helpers/actions';
import { getPreparedData } from './api/data';

import { LoadButton } from './components/LoadButton';
import { Loader } from './components/Loader';
import { TodoList } from './components/TodoList';


const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getTodos);
  const loading = useSelector(isLoading);
  const loaded = useSelector(isLoaded);
  const areTodosExist = loaded && todos.length > 0;
  const shouldButtonHide = !loading && !loaded;

  const loadTodos = useCallback(() => {
    dispatch(setIsLoading(true));

    setTimeout(() => {
      getPreparedData()
        .then(data => dispatch(setTodos(data)));

      dispatch(setIsLoading(false));
    }, 3000);

    dispatch(setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div className="heading">
        <h1>Redux list of TODOs</h1>
        {shouldButtonHide && <LoadButton loadTodos={loadTodos} />}
        {loading && <Loader />}
      </div>
      {areTodosExist && (
        <TodoList todos={todos} />)}
    </>
  );
};

export default App;
