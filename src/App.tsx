/* eslint-disable max-len */
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import React, { useCallback, useEffect, useState } from 'react';
import { getTodos } from './api';
import { store } from './app/store';
import { Loader } from './components/Loader';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { actions as todosActions } from './features/todos';

export const App = () => {
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchTodos = useCallback(() => {
    getTodos()
      .then(fetchedTodos => {
        store.dispatch(todosActions.setTodos(fetchedTodos));
      })
      .catch(error => setFetchError(error.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleRetry = () => {
    setLoading(true);
    setFetchError(null);
    fetchTodos();
  };

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
              {loading ? (
                <Loader />
              ) : fetchError ? (
                <>
                  <div className="notification is-danger">{fetchError}</div>
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="button is-link mt-4"
                  >
                    Reload todos
                  </button>
                </>
              ) : (
                <TodoList />
              )}
            </div>
          </div>
        </div>
      </div>
      <TodoModal />
    </>
  );
};

export default React.memo(App);
