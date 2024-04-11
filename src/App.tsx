/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions as todoAction } from './features/todos';

export const App: React.FC = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const loadTodos = useCallback(async () => {
    try {
      setIsLoading(true);
      const loadedTodos = await getTodos();

      dispatch(todoAction.setTodos(loadedTodos));
    } catch (error) {
      setErrorMsg(`Error loading todos:, ${error}`);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(false);
    loadTodos();
  }, [loadTodos]);

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
              {!errorMsg && <TodoList />}
              {errorMsg && <div className="error">{errorMsg}</div>}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
