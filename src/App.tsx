import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList } from './components';
import { useAppSelector } from './hooks';
import { RootState } from './app/store';
import { getTodos } from './api';
import { useEffect } from 'react';
import {
  setEndLoading,
  setError,
  setLoading,
  setTodos,
} from './features/todos';
import { useDispatch } from 'react-redux';

export const App = () => {
  const dispatch = useDispatch();
  const status = useAppSelector((state: RootState) => state.todos.status);

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch(setLoading());
      try {
        const fetchedTodos = await getTodos();

        dispatch(setTodos(fetchedTodos));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch todos:', error);
        dispatch(setError());
      } finally {
        dispatch(setEndLoading());
      }
    };

    fetchTodos();
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {status === 'loading' ? (
              <Loader />
            ) : (
              <>
                <h1 className="title">Todos:</h1>
                <div className="block">
                  <TodoFilter />
                </div>
                <div className="block">
                  <TodoList />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
