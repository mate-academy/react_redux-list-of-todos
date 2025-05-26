import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getTodos } from './api';
import { RootState } from './app/store';
import { setLoading, setTodos, setError } from './features/todos';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';

export const App = () => {
  const { loading, error } = useSelector((state: RootState) => state.todos);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch(setLoading(true));
      try {
        const todos = await getTodos();

        dispatch(setTodos(todos));
      } catch (err) {
        dispatch(setError('Failed to load todos.'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchTodos();
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

              {error && <p className="notification is-danger">{error}</p>}

              {!loading && !error && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
