import { useEffect, useState } from 'react';
import { useAppDispatch } from './app/hooks';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { getTodos } from './api';
import { setTodos } from './features/todos';

export const App = () => {
  const dispatch = useAppDispatch();

  const [isAppLoading, setIsAppLoading] = useState(false);

  useEffect(() => {
    setIsAppLoading(true);

    getTodos()
      .then(todosFromServer => {
        dispatch(setTodos(todosFromServer));
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Помилка завантаження:', error);
      })
      .finally(() => {
        setIsAppLoading(false);
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
              {isAppLoading ? <Loader /> : <TodoList />}
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
