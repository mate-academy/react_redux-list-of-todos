/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(newTodos => dispatch(todosActions.set(newTodos)))
      .catch((e) => {
        throw new Error(e);
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
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal />
      )}
    </>
  );
};
