/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { createSelector } from 'reselect';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { RootState } from './app/store';
import { Todo } from './types/Todo';
import { actions as currentTodoActions } from './features/currentTodo';
import { actions as todosActions } from './features/todos';
import { actions as filterActions } from './features/filter';
import { getTodos } from './api';
import { Status } from './types/Status';

const setVisibleTodos = createSelector(
  (state: RootState) => state.todos,
  (state: RootState) => state.filter,
  (todos, filter) => {
    const isMatch = (str: string) => str.toLowerCase().includes(filter.query.toLowerCase());

    return todos.filter(({ title, completed }) => {
      switch (filter.status) {
        case 'active':
          return !completed && isMatch(title);

        case 'completed':
          return completed && isMatch(title);

        default:
          return isMatch(title);
      }
    });
  },
);

export const App: React.FC = () => {
  const [isError, setIsError] = useState(false);

  const dispatch = useAppDispatch();

  const visibleTodos = useAppSelector(setVisibleTodos);
  const currentTodo = useAppSelector((state) => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);

  const handleTodoSelect = (todo: Todo) => dispatch(currentTodoActions.setTodo(todo));

  const handleTodoRemove = () => dispatch(currentTodoActions.removeTodo());

  const handleQueryChange = (value: string) => dispatch(filterActions.setQuery(value));

  const handleStatusChange = (value: Status) => dispatch(filterActions.setStatus(value));

  useEffect(() => {
    getTodos()
      .then((todos) => dispatch(todosActions.setTodos(todos)))
      .catch(() => setIsError(true));
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            {!isError && (
              <div className="block">
                <TodoFilter
                  selectValue={status}
                  query={query}
                  onQueryChange={handleQueryChange}
                  onFilterSelect={handleStatusChange}
                />
              </div>
            )}

            <div className="block">
              {!!visibleTodos.length && (
                <TodoList
                  todos={visibleTodos}
                  onTodoSelect={handleTodoSelect}
                  selectedTodo={currentTodo}
                />
              )}

              {!visibleTodos.length && !query && !isError && (
                <Loader />
              )}

              {!visibleTodos.length && query && !isError && (
                <p className="notification is-warning">
                  There are no todos matching current filter criteria
                </p>
              )}

              {isError && (
                <p className="notification is-danger">
                  Oops! Something went wrong! Cannot load todos.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          selectedTodo={currentTodo}
          onDeleteSelection={handleTodoRemove}
        />
      )}
    </>
  );
};
