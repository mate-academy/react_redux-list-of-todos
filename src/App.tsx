import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setTodos } from './features/todos';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(todos => {
        dispatch(setTodos(todos));
      })
      .catch(() => {
        setErrorMessage('Failed to load todos');
      })
      .finally(() => {
        setLoading(false);
      });
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
              {loading && <Loader />}

              {!loading && errorMessage && (
                <p className="has-text-danger">{errorMessage}</p>
              )}

              {!loading && !errorMessage && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
