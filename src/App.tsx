import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTodosFromServer } from './helpers/api';

import './App.scss';
import { TodosList } from './components/TodosList';
import { Buttons } from './components/Buttons';

import {
  startLoading,
  finishLoading,
  isLoading,
  isVisibleSortButtons,
  getVisibleTodos,
  setSortField,
} from './store';

const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getVisibleTodos);
  const loading = useSelector(isLoading);
  const visibleSortButtons = useSelector(isVisibleSortButtons);

  const handleGetTodos = () => {
    dispatch(startLoading());
    getTodosFromServer()
      .then(todosFromServer => dispatch(finishLoading(todosFromServer)));
  };

  const handleSort = (sortType: string) => {
    dispatch(setSortField(sortType));
  };

  const buttonsInit: Button[] = [
    { id: 1, title: 'Sort by title', event: handleSort, sortType: 'title' },
    { id: 2, title: 'Sort by complete', event: handleSort, sortType: 'complete' },
    { id: 3, title: 'Sort by user', event: handleSort, sortType: 'user' },
  ];

  return (
    <div className="App">
      <h1>Redux list of todos</h1>
      {
        visibleSortButtons
          ? <Buttons buttonsInit={buttonsInit} />
          : <button
            type="button"
            className="todo__button"
            onClick={handleGetTodos}
          >
            Load Todos
          </button>
      }
      {loading
        ? (
          <div className="lds-ellipsis">
            <div />
            <div />
            <div />
            <div />
          </div>
        )
        :
        <TodosList todos={todos} />}
    </div>
  );
};

export default App;
