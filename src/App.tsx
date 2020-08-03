import React from 'react';
import { useSelector } from 'react-redux';

import './App.scss';
import Start from './components/Start/Start';

import { isLoading } from './store';
import TodoList from './components/TodoList/TodoList';

const App = () => {
  const loading = useSelector(isLoading);

  return (
    <div className="App">
      <h1>Redux list of todos</h1>
      <h2 className="loading">{loading && 'Loading...'}</h2>

      <Start />
      <TodoList />
    </div>
  );
};

export default App;
