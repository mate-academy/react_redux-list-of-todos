import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
import { setTodos, setLoading } from './features/todos';
import { getTodos } from './api';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadTodos = async () => {
      dispatch(setLoading(true));
      try {
        const todos = await getTodos();

        dispatch(setTodos(todos));
      } catch (error) {
        dispatch(setLoading(false));
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
              <Loader />
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
