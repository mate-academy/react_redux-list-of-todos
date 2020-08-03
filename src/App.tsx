import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';

import { TodoList } from './components/TodoList/TodoList';

import { getPreparedTodos } from './api';
import {
  setTodos,
  setLoadingStatus,
  selectTodos,
  getLoadingStatus } from './store'

const App: FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const isLoaded = useSelector(getLoadingStatus);

  const handleStart = async () => {
    dispatch(setLoadingStatus());

    const data = await getPreparedTodos();

    dispatch(setTodos(data));
  };

  return (
    <div className="App">
      <h1>Dynamic list of todos</h1>
      <p>
        <span>Todos: </span>
        {todos.length}
      </p>

      { todos.length === 0
        ? (
          <button
            type="button"
            disabled={isLoaded}
            onClick={handleStart}
          >
            {!isLoaded ? 'Start' : 'Loading...'}
          </button>
        )
        : <TodoList todos={todos} />}
    </div>
  );
};

export default App;
