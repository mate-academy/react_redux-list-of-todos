/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { actions } from './features/todos';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const getTodosFromServer = useCallback(async () => {
    setIsLoading(true);

    try {
      const todosFromServer = await getTodos();

      dispatch(actions.add(todosFromServer));
    } catch (e) {
      throw new Error('Error when get todos');
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    getTodosFromServer();
  }, [getTodosFromServer]);

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
              {!isLoading && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
