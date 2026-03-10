import { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch } from './app/hooks';
import { getTodos } from './api';
import { setTodos } from './features/todos';

export const App = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(todos => dispatch(setTodos(todos)))
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
