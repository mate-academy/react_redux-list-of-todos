/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions } from './features/todos';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);

    getTodos().then(result => {
      dispatch(actions.setTodos(result));
    }).catch(() => {
      setHasError(true);
    }).finally(() => {
      setIsLoading(false);
    });
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
              {isLoading && <Loader />}

              {hasError ? (
                <p className="notification is-danger">
                  Unable to load todos
                </p>
              ) : (
                <TodoList />
              )}
            </div>
          </div>
        </div>
      </div>

      {!!currentTodo && <TodoModal />}
    </>
  );
};
