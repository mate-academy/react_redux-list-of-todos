import React from 'react';
import { useSelector } from 'react-redux';

import './App.scss';
import Start from './components/Start';
import TodoList from './components/TodoList';

import { isLoading, getTodos } from './store';

const App = () => {
  const loading = useSelector(isLoading);
  const todoList = useSelector(getTodos);

  return (
    <div className="App">
      <h2>{loading && 'Loading...'}</h2>
      {(!todoList.length && loading === false) && <Start />}
      {todoList.length !== 0 && <TodoList />}

    </div>
  );
};

export default App;
