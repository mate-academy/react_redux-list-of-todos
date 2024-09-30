import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './app/hooks';
import { useCallback, useEffect, useState } from 'react';
import { getTodos } from './api';
import { setTodos } from './features/todos';
import { selectCurrentTodo, selectTodos } from './features/todoSelectors';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(selectTodos);
  const currentTodo = useAppSelector(selectCurrentTodo);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTodos = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedTodos = await getTodos();

      dispatch(setTodos(fetchedTodos));
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

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
              {!isLoading && !!todos.length && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
