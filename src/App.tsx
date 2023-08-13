/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions } from './features/todos';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { FilterStatus } from './types/FilterStatus';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const todos = useAppSelector((state) => state.todos);
  const currentTodo = useAppSelector((state) => state.currentTodo);
  const { query, status } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getTodos()
      .then((todosFromServer) => {
        dispatch(actions.setTodos(todosFromServer));
      })
      .catch((error) => {
        throw new Error(error.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter((todo) => {
      const normalizedQuery = query.toLowerCase().trim();

      const normalizedTodo = todo.title
        .toLowerCase()
        .trim()
        .includes(normalizedQuery);

      switch (status) {
        case FilterStatus.ALL:
          return normalizedTodo;

        case FilterStatus.ACTIVE:
          return normalizedTodo && !todo.completed;

        case FilterStatus.COMPLETED:
          return normalizedTodo && todo.completed;

        default:
          throw new Error('Unknown status selector');
      }
    });
  }, [todos, query, status]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {isLoading ? <Loader /> : <TodoList todos={visibleTodos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
