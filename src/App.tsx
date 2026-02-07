import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './app/store';
import { useAppSelector } from './app/hooks';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { setTodos } from './features/todos';

export const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    const allTodos = async () => {
      try {
        const todosFromServer = await getTodos();

        dispatch(setTodos(todosFromServer));
      } catch (e) {
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };

    allTodos();
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

              {!loading && !error && todos.length === 0 && (
                <p className="title is=5">There are no todos in the list</p>
              )}
              {!loading && !error && todos.length > 0 && <TodoList />}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && <TodoModal />}
    </>
  );
};
