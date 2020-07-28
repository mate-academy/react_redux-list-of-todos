import React from 'react';
import { useSelector } from 'react-redux';
import {
  isLoading, getTodos, getSortedTodos, getSortField,
} from './store';

import './App.scss';
import { Start } from './components/Start';
import Sort from './components/Sort';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const loading = useSelector(isLoading);
  const sortField = useSelector(getSortField);
  const todos = useSelector(getTodos);

  return (
    <div className="App">
      <h1>Redux list of todos</h1>
      <h2>{loading ? 'Loading...' : ''}</h2>
      {
        todos.length > 0
          ? (
            <Sort />
          )
          : (
            <Start title="Start loading" />
          )
      }
      <TodoList todos={todos.sort(getSortedTodos(sortField))} />
    </div>
  );
};
