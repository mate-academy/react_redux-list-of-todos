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
import { actions as todoActions } from './features/todos';
import { filteredTodos } from './utils/filteredTodos';
import { warningTimer } from './utils/warningTimer';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState('');

  const visibleTodos = useMemo(() => (
    filteredTodos(todos, query, status)
  ), [todos, query, status]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const todosData = await getTodos();

        dispatch(todoActions.setTodos(todosData));
      } catch (error) {
        setHasError(`${error}`);
        warningTimer(setHasError, '', 3000);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            {hasError && (
              <div
                className="notification is-danger"
                data-cy="PostsLoadingError"
              >
                {hasError}
              </div>
            )}

            <div className="block">
              {isLoading
                ? <Loader />
                : <TodoList visibleTodos={visibleTodos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal currentTodo={currentTodo} setHasError={setHasError} />}
    </>
  );
};
