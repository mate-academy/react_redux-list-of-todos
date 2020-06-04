import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodosFromServer, Todos } from './api/api';


import './App.scss';
import TodoList from './components/TodoList';

import {
  isLoading,
  startLoading,
  finishLoading,
  getTodos,
  setSortType,
  getSortType
} from './store';

const getVisibleTodos = (todos: Todos[], sortType: string) => {
  switch (sortType) {
    case 'title':
      return [...todos].sort((a, b) => a.title.localeCompare(b.title));

    case 'userName':
      return [...todos].sort((a, b) => {
        return a.user && b.user
          ? a.user.name.localeCompare(b.user.name)
          : 0;
      });

    case 'id':
      return [...todos].sort((a, b) => a.id - b.id);

    default:
      return todos;
  }
}

const App = () => {
  const loading = useSelector(isLoading);
  const todos = useSelector(getTodos)
  const sortType = useSelector(getSortType);
  const dispatch = useDispatch();

  const handleLoadClick = () => {
    dispatch(startLoading());

    getTodosFromServer()
      .then(todosFromServer => dispatch(finishLoading(todosFromServer)))
  }

  const visibleTodos = useMemo(
    () => getVisibleTodos(todos, sortType),
    [sortType, todos]
  )

  return (
    <div className="App">
      <h1>Redux list of todos</h1>

      {todos.length === 0
        ? (
          <>
            <button
              onClick={handleLoadClick}
              type="button"
              className="buttonload"
            >
              <i className={loading ? "fa fa-spinner fa-spin" : ""}>
              </i>
              {loading ? 'Loading' : 'Load'}
            </button>
          </>
        )
        : (
          <>
            <button
              type="button"
              onClick={() => dispatch(setSortType('title'))}
              className="button left"
            >
              Sort by title
            </button>

            <button
              type="button"
              onClick={() => dispatch(setSortType('id'))}
              className="button"
            >
              Sort by id
            </button>

            <button
              type="button"
              onClick={() => dispatch(setSortType('userName'))}
              className="button"
            >
              Sort by user
            </button>

            <TodoList todoList={visibleTodos} />
          </>
        )}
    </div>
  );
};

export default App;
