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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);

  const loadTodos = async () => {
    try {
      setIsLoading(true);

      const todosFromServer = await getTodos();

      dispatch(todosActions.loadTodos(todosFromServer));
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            {!!todos.length && (
              <div className="block">
                <TodoFilter />
              </div>
            )}

            <div className="block">
              {isLoading && <Loader />}

              {hasError && (
                <p className="notification is-danger">
                  Error occured while loading todos.
                  Please try again later.
                </p>
              )}

              {!!todos.length && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
