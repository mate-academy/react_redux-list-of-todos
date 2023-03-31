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
  const [hasError, setHasError] = useState(false);
  const [isTodosLoaded, setIsTodosLoaded] = useState(false);
  const [isTodosReceived, setIsTodosReceived] = useState(false);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const getTodosFromServer = async () => {
    try {
      const todos = await getTodos();

      dispatch(todosActions.setTodos(todos));
      setIsTodosLoaded(true);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsTodosReceived(true);
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
              {!isTodosLoaded && <Loader />}

              {isTodosReceived && (
                <TodoList />
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
