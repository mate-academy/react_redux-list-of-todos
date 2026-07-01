import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import React from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { setTodos } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setCurrentTodo } from './features/currentTodo';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const [loading, setLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleTodoClick = (todo: Todo | null) => {
    dispatch(setCurrentTodo(todo));
  };

  const handleTodoClose = () => {
    dispatch(setCurrentTodo(null));
  };

  React.useEffect(() => {
    setLoading(true);

    getTodos()
      .then(data => {
        dispatch(setTodos(data));
      })
      .catch(() => setErrorMessage('Failed to load todo list'))
      .finally(() => setLoading(false));
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            {errorMessage && (
              <div className="notification is-danger">
                <button
                  className="delete"
                  onClick={() => setErrorMessage(null)}
                  aria-label="close"
                />
                {errorMessage}
              </div>
            )}

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && <TodoList onTodoClick={handleTodoClick} />}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleTodoClose} />
      )}
    </>
  );
};
