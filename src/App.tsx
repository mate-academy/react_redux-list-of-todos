import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.scss';

import { getTodos, getLoaded, getLoading } from './store/selectors';
import { setIsLoaded, setIsLoading, setTodos } from './store/actions';
import { getPreparedData } from './api/data';

import { LoadButton } from './components/LoadButton';
import { Loader } from './components/Loader';
import { TodoList } from './components/TodoList';


const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getTodos);
  const isLoading = useSelector(getLoading);
  const isLoaded = useSelector(getLoaded);
  const doTodosExist = useMemo(
    () => isLoaded && todos.length > 0,
    [isLoaded, todos.length]
  );
  const isButtonVisible = useMemo(
    () => !isLoading && !isLoaded,
    [isLoading, isLoaded]
  );

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
        {isButtonVisible && <LoadButton loadTodos={loadTodos} />}
        {isLoading && <Loader />}
      </div>
      {doTodosExist && (
        <TodoList todos={todos} />)}
    </>
  );
};

export default App;
