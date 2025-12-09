import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch } from './app/hooks';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { setTodos } from './features/todos';

export const App = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        const todos = await getTodos();

        dispatch(setTodos(todos.slice(0, 5)));
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
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
              {!isLoading && hasError && (
                <p
                  className="notification is-danger"
                  data-cy="errorNotification"
                >
                  Something went wrong
                </p>
              )}
              {!isLoading && !hasError && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
