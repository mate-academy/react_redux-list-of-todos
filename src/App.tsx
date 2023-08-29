/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const todosFromServ = useAppSelector(store => store.todos);
  const currentTodo = useAppSelector(store => store.currentTodo);

  useEffect(() => {
    getTodos()
      .then(todos => dispatch(todosActions.setTodos(todos)))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {isLoading && (
              <Loader />
            )}

            {isError && (
              <p className="notification is-warning">
                Всьо ідьот по плану.
              </p>
            )}

            {(!!todosFromServ.length && !isLoading) && (
              <>
                <h1 className="title">Todos:</h1>

                <div className="block">
                  <TodoFilter />
                </div>

                <div className="block">
                  <TodoList />
                </div>
              </>
            )}

          </div>
        </div>
      </div>

      { currentTodo && (
        <TodoModal currentTodo={currentTodo} />
      )}
    </>
  );
};
