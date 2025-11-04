import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/index';
import { getTodos } from './api';
import { setError, setLoading, setTodos } from './features/todos';

export const App = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(s => s.todos.isLoading);

  useEffect(() => {
    (async () => {
      try {
        dispatch(setLoading(true));
        const data = await getTodos();

        dispatch(setTodos(data));
      } catch (e) {
        dispatch(setError('Failed to load todos'));
      } finally {
        dispatch(setLoading(false));
      }
    })();
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
              {isLoading && <Loader />}
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
