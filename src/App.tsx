/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { getPreparedTodos } from './utils/functions';
import { actions as todosActions } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos, currentTodo, filter } = useAppSelector(store => store);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then((res) => {
        dispatch(todosActions.setTodos(res));
      })
      .catch(() => {
        throw new Error('Error');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const preparedTodos = getPreparedTodos(todos, filter);

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
              {isLoading
                ? (
                  <Loader />
                ) : (
                  <TodoList todos={preparedTodos} />
                )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
