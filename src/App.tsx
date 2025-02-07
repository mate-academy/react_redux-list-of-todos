import { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { todosSlice } from './features/todos';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';

export const App = () => {
  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState(true);

  const loadTodos = useCallback(async () => {
    try {
      const todos = await getTodos();

      dispatch(todosSlice.actions.loadTodos(todos));
    } catch {
      alert('Unable to load todo list');
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

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
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList selectedTodo={selectedTodo} />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal selectedTodo={selectedTodo} />}
    </>
  );
};
