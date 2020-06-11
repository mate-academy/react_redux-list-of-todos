/* eslint-disable import/no-duplicates */
import React from 'react';
import './App.scss';

import TodoList from './components/TodosList';
import LoadingButtons from './components/LoadingButtons';
import SortButtons from './components/SortButtons';

const App = () => {
  return (
    <div className="app">
      <h1>Redux list of todos</h1>
      <LoadingButtons />

      <SortButtons />

      <TodoList />
    </div>
  );
};

export default App;
