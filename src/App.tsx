import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect } from 'react';
import { getTodos } from './api';
import { loadTodos, setLoading } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App = () => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(state => state.todos.loading);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        dispatch(setLoading(true));

        const todos = await getTodos();

        dispatch(loadTodos(todos));
      } catch (error) {
        dispatch(setLoading(false));
      }
    };

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
              {loading && <Loader />}
              <TodoList />
            </div>
          </div>
        </div>
      </div>
      <TodoModal />
    </>
  );
};
