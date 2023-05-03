/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { getVisibleTodos } from './helper';

export const App: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const [hasTodosLoaded, setHasTodosLoaded] = useState(false);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const visibleTodos = useMemo(
    () => getVisibleTodos(todos, status, query),
    [todos, status, query],
  );

  const getTodosFromServer = async () => {
    try {
      const apiTodos = await getTodos();

      dispatch(todosActions.setTodos(apiTodos));
    } catch (error) {
      setHasError(true);
    } finally {
      setHasTodosLoaded(true);
    }
  };

  useEffect(() => {
    getTodosFromServer();
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

            {hasError && (
              <p>Cant Load Todos. Try again later, please</p>
            )}

            <div className="block">
              {!hasTodosLoaded && <Loader />}

              {hasTodosLoaded && (
                <TodoList todos={visibleTodos} />
              )}

            </div>
          </div>
        </div>
      </div>

      {!!currentTodo && (
        <TodoModal />
      )}
    </>
  );
};
