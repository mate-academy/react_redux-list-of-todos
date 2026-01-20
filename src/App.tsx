import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch } from './app/hooks';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { setTodos } from './features/todos';

export const App = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const LoadTodos = async () => {
      setLoading(true);
      try {
        const data = await getTodos();

        dispatch(setTodos(data));
      } catch (err) {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    LoadTodos();
  }, [dispatch]);

  return (
    <>
      <div className="section">
        {loading && <Loader />}
        {error && (
          <div className="notification is-danger">
            {error}
            <button className="delete" onClick={() => setError(null)} />
          </div>
        )}
        {!loading && (
          <div className="container">
            <div className="box">
              <h1 className="title">Todos:</h1>

              <div className="block">
                <TodoFilter />
              </div>

              <div className="block">
                <TodoList />
              </div>
            </div>
          </div>
        )}
      </div>

      <TodoModal />
    </>
  );
};
