/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { filterTodos } from './helpers/filterTodos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos);
  const currentTodo = useAppSelector((state) => state.currentTodo);
  const { status, query } = useAppSelector((state) => state.filter);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  const toShowTodoList = !isLoading && !hasLoadingError;

  useEffect(() => {
    (async () => {
      try {
        const todosFromServer = await getTodos();

        dispatch(todosActions.set(todosFromServer));
      } catch {
        setHasLoadingError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const visibleTodos = useMemo(() => filterTodos(todos, status, query), [todos, status, query]);

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
              {isLoading && <Loader />}
              {hasLoadingError && <p>There was an error while loading todos</p>}
              {toShowTodoList && <TodoList todos={visibleTodos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal todo={currentTodo} />}
    </>
  );
};
