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
import { actions as todoActions } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchTodos() {
      try {
        setIsLoading(true);
        const loadedTodos = await getTodos();

        dispatch(todoActions.getTodos(loadedTodos));
      } catch (e) {
        throw new Error('Todos not found');
      } finally {
        setIsLoading(false);
      }
    }

    fetchTodos();
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
              {
                isLoading
                  ? <Loader />
                  : <TodoList />
              }
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal todo={currentTodo} />}
    </>
  );
};
