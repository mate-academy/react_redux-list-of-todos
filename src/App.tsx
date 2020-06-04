import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.scss';
import Start from './components/Start';
import { TodoList } from './components/TodoList';
import { SortPanel } from './components/SortPanel';

import {
  startLoading,
  isLoading,
  finishLoading,
  getMessage,
  setTodos,
  setVisibleContent,
  getVisibleContent,
} from './store';

import { getTodosFromServer } from './helpers/api';

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const message = useSelector(getMessage) || '';
  const visibleContent = useSelector(getVisibleContent);

  const loadTodos = async () => {
    dispatch(startLoading());
    try {
      const todosFromServer = await getTodosFromServer();

      dispatch(setTodos(todosFromServer));
      dispatch(finishLoading(''));
      dispatch(setVisibleContent());
    } catch (err) {
      dispatch(finishLoading(`Something went wrong: ${err}`));
    }
  };

  return (
    <div className="App">
      <h1>Redux list of todos</h1>
      <h5>{loading ? 'Loading...' : message}</h5>
      {visibleContent ? (
        <>
          <SortPanel />
          <TodoList />
        </>
      ) : (
        <Start title="Start loading" handleLoadClick={loadTodos} />
      )}
    </div>
  );
};

export default App;
