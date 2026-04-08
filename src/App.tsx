import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTodos } from './api';
import { setTodos } from './features/todos';

export const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getTodos()
      .then(todos => {
        dispatch(setTodos(todos));
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
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
              {isLoading && <Loader />}
              {isError && (
                <p className="notification is-danger">Failed to load todos</p>
              )}
              {!isLoading && !isError && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
