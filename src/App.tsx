import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const isTodoSelected = currentTodo !== null;
  const areTodosLoaded = !isLoading && !hasError;

  const loadTodos = useCallback((async () => {
    try {
      const todosFromServer = await getTodos();

      dispatch(todosActions.setTodos(todosFromServer));
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }), []);

  useEffect(() => {
    loadTodos();
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

              {hasError && (
                <p className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {areTodosLoaded && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {isTodoSelected && <TodoModal />}
    </>
  );
};
