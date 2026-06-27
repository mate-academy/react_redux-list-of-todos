import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { setTodos } from './features/todos';

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoading(true);
        const data = await getTodos();

        dispatch(setTodos(data));
      } catch (e) {
        setError('Error');
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, [dispatch]);

  if (error) {
    return <p>Try again</p>;
  }

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
              <TodoList setOpen={setOpen} open={open} />
            </div>
          </div>
        </div>
      </div>

      {open && <TodoModal setOpen={setOpen} />}
    </>
  );
};
