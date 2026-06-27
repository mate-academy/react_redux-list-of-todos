import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useEffect, useState } from 'react';
import { useAppDispatch } from './app/hooks';
import { getTodos } from './api';
import { setTodos } from './features/todos';

import { Loader, TodoFilter, TodoList, TodoModal } from './components';

export const App = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(data => dispatch(setTodos(data)))
      .catch(() => dispatch(setTodos([])))
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
              {!loading && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
