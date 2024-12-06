import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect } from 'react';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { todosFetching } from './features/todos';
import { startLoading, stopLoading } from './features/currentTodo';

export const App = () => {
  const { currentTodo, loading } = useAppSelector(state => state.currentTodo);
  const { todos } = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(startLoading()); // Start loader
    getTodos()
      .then(data => dispatch(todosFetching(data))) // Load todos
      .finally(() => dispatch(stopLoading())); // Stop loader
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
              {loading && <Loader data-cy="loader" />} {/* Show loader */}
              {!loading && todos.length > 0 && <TodoList isLoading={false} />}
              {!loading && todos.length === 0 && (
                <p data-cy="no-todos">No todos available</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal todo={currentTodo} />}
    </>
  );
};
