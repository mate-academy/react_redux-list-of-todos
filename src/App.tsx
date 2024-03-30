/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { actions } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const todos = await getTodos();

        dispatch(actions.updateTodos(todos));
      } catch (error) {
        throw new Error(`Unable to fetch todos. Error: ${error}`);
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
            {!isLoading ? (
              <>
                <h1 className="title">Todos:</h1>

                <div className="block">
                  <TodoFilter />
                </div>

                <div className="block">
                  <TodoList />
                </div>
              </>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal userId={currentTodo.userId} todo={currentTodo} />
      )}
    </>
  );
};
