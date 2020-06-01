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
  getTodos,
  sortedTodos
} from './store';


const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getTodos);
  const loading = useSelector(isLoading);
  const visibleSortButtons = useSelector(isVisibleSortButtons);

  const handleGetTodos = () => {
    dispatch(startLoading());
    getTodosFromServer()
      .then(todosFromServer => dispatch(finishLoading(todosFromServer)));
  };

  const handleSort = (sortType: string) => {
    switch (sortType) {
      case 'title':
        dispatch(sortedTodos(todos.sort((a, b) => (
          a.title.localeCompare(b.title)
        )))); break;
      case 'complete':
        dispatch(sortedTodos(todos.sort((a, b) => (
          +a.completed - +b.completed
        )))); break;
      case 'user':
        dispatch(sortedTodos(todos.sort((a, b) => (
          a.userCatalog.name.localeCompare(b.userCatalog.name)
        )))); break;
      default: dispatch(sortedTodos(todos));
    }
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
