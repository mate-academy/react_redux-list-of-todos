import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useSelector } from 'react-redux';
import { isLoading, getTodos } from './store';

import Start from './components/Start/Start';
import TodoList from './components/TodoList/TodoList';

import './App.scss';

const App = () => {
  const loading = useSelector(isLoading);
  const todos = useSelector(getTodos);

  return (
    <div className="App">
      <h1>Redux list of todos</h1>
      <h2>{loading && 'Loading...'}</h2>
      {(!todos.length && loading === false) && <Start />}
      {todos.length !== 0 && <TodoList />}
    </div>
  );
};

export default App;
