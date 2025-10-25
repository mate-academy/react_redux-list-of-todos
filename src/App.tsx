import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import React, { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/storeHooks';
import { todosSlice } from './features/todos';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    getTodos()
      .then(todoFromApi => {
        dispatch(todosSlice.actions.setTodos(todoFromApi));
      })
      .catch(error => setErrorMessage(error.message))
      .finally(() => setLoading(false));
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

              {!loading && !errorMessage && <TodoList />}

              {!loading && errorMessage && (
                <div className="notification is-danger" data-cy="error">
                  {errorMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
