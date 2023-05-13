import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { actions as todosActions } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { filteredTodos } from './utils/filteredTodos';
import { getTodos } from './api';
import { notificationTimer } from './utils/notificationTimer';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const visibleTodos = useMemo(() => (
    filteredTodos(todos, query, status)
  ), [todos, query, status]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const todosFromServer = await getTodos();

        dispatch(todosActions.setTodos(todosFromServer));
      } catch (err) {
        setError(`${err}`);
        notificationTimer(setError, '', 3000);
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

            {error && (
              <div
                className="notification is-danger"
                data-cy="PostsLoadingError"
              >
                {error}
              </div>
            )}

            <div className="block">
              {isLoading
                ? <Loader />
                : <TodoList todos={visibleTodos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          todo={currentTodo}
          setError={setError}
        />
      )}
    </>
  );
};
