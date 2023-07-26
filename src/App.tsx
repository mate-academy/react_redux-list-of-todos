/* eslint-disable max-len */
import React, { useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';
import { normalizeValue } from './helpers/normalize';
import { FilterStatus } from './types/FilterStatus';

export const App: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const loadTodos = async () => {
    const todosFromServer = await getTodos();

    dispatch(todosActions.setTodos(todosFromServer));
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const todosFilteredByStatus = useMemo(() => {
    return todos.filter(todo => {
      switch (status) {
        case FilterStatus.active:
          return !todo.completed;

        case FilterStatus.completed:
          return todo.completed;

        case FilterStatus.all:
        default:
          return true;
      }
    });
  }, [status, todos]);

  const todosFilteredByTitle = useMemo(() => {
    return todosFilteredByStatus.filter(todo => {
      const normalizedTitle = normalizeValue(todo.title);
      const normalizedQuery = normalizeValue(query.trim());

      return normalizedTitle.includes(normalizedQuery);
    });
  }, [todosFilteredByStatus, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectValue={status}
              />
            </div>

            <div className="block">
              {!todos.length
                ? <Loader />
                : (
                  <TodoList
                    todos={todosFilteredByTitle}
                    selectedTodo={currentTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          todo={currentTodo}
        />
      )}
    </>
  );
};
