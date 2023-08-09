/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { actions as todosAction } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector((state) => state.currentTodo);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
    getTodos()
      .then(result => dispatch(todosAction.addTodos(result)))
      .catch(() => {
        setHasError(true);
      })
      .finally(() => setIsLoading(false));
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

            <div className="block">
              {hasError ? (
                <p>An error occurred while fetching todos. Please try again later.</p>
              ) : (
                <>
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <TodoList />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo
        && (
          <TodoModal />
        )}
    </>
  );
};
