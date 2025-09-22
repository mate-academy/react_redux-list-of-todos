import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import React, { useEffect, useState } from 'react';
import { getTodos } from './api';
import { todosSlice } from './features/todos';
import { useAppDispatch } from './hooks';

export const App = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchTodos() {
      try {
        setIsLoading(true);
        const todos = await getTodos();

        dispatch(todosSlice.actions.setTodos(todos));
      } catch {
        return 'Something went wrong';
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
              {isLoading && <Loader />}
              <TodoList isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
