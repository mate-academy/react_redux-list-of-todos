import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks/useAppDispatch';
import { getTodos } from './api';
import { setError, setIsLoading, setTodos } from './features/todos';
import { useAppSelector } from './hooks/useAppSelector';

export function App() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(state => state.todos);
  const { currentTodo } = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        dispatch(setIsLoading(true));
        dispatch(setError(false));

        const todos = await getTodos();

        dispatch(setTodos(todos));
      } catch {
        dispatch(setError(true));
      } finally {
        dispatch(setIsLoading(false));
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
              {isLoading && <Loader />}
              {!isLoading && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
}
