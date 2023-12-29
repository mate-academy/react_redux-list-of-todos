/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const dispatch = useAppDispatch();
  const { todos, currentTodo } = useAppSelector(state => state);

  useEffect(() => {
    (async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const todosFromServer = await getTodos();

        dispatch(todosActions.setTodos(todosFromServer));
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [dispatch]);

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
              {isLoading && (
                <Loader />
              )}

              {isError && !isLoading && (
                <p>Cannot load todos. Try again!</p>
              )}

              {!isError && !isLoading && !todos && (
                <p>There is no Todos!</p>
              )}

              {todos.length > 0 && !isError && !isLoading && (
                <TodoList />
              )}
            </div>

          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
