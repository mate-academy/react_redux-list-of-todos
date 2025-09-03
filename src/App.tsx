import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppSelector } from './app/hooks';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { todosSlice } from './features/todos';

export const App = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTodos = () => {
    setLoading(true);
    setError(null);

    getTodos()
      .then(todos => dispatch(todosSlice.actions.setTodos(todos)))
      .catch(() => setError('Failed to load todos'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

              {error && (
                <div className="notification is-danger">
                  {error}
                  <button
                    className="button is-small is-light ml-3"
                    onClick={loadTodos}
                  >
                    Retry
                  </button>
                </div>
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
