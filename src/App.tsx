/* eslint-disable no-console */
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { setTodos } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App = () => {
  const [isLoading, setIsLoading] = useState<string | null>('todo');

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading('todo');
    const loadTodos = async () => {
      try {
        const result = await getTodos();

        dispatch(setTodos(result));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(null);
      }
    };

    loadTodos();
  }, [dispatch]);

  const user = useAppSelector(state => state.user);

  return (
    <>
      <div className="section">
        <div className="container">
          {isLoading === 'todo' ? (
            <Loader />
          ) : (
            <div className="box">
              <h1 className="title">Todos:</h1>

              <div className="block">
                <TodoFilter />
              </div>

              <div className="block">
                <TodoList setIsLoading={setIsLoading} />
              </div>
            </div>
          )}
        </div>
      </div>
      {(isLoading === 'modal' || user) && <TodoModal isLoading={isLoading} />}
    </>
  );
};
