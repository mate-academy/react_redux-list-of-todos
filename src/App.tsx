import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTodos } from './api';
import { setTodos } from './features/todos';
import { useAppSelector } from './app/hoors';
import { setLoading } from './features/currentTodo';

export const App = () => {
  const dispatch = useDispatch();

  const { isLoading } = useAppSelector(state => state.todos);

  useEffect(() => {
    const loadTodos = async () => {
      dispatch(setLoading(true));

      try {
        const data = await getTodos();

        dispatch(setTodos(data));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Помилка завантаження:', error);
      } finally {
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

            <div className="block">{isLoading ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
