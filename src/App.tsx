import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { setTodos } from './features/todos';

export const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchTodos() {
      try {
        setLoading(true);
        const todos = await getTodos();

        dispatch(setTodos(todos));
      } catch (e) {
        return `${e}`;
      } finally {
        setLoading(false);
      }
    }

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
              {loading ? <Loader /> : <TodoList loading={loading} />}
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
