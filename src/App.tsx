/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { actions as todoActions } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentTodo } = useAppSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getTodos()
      .then((todos) => {
        dispatch(todoActions.setTodos(todos));
      })
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
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
              {loading && <Loader />}

              {error && (
                <p className="notification is-danger">
                  Something went wrong...
                </p>
              )}

              {!loading && !error && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
