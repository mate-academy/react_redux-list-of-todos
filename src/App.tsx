import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { loadTodosAndUsers } from './features/thunks';
import { TodoList, TodoFilter, Loader, TodoModal } from './components';
import { RootState } from './app/store';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state: RootState) => state.todos.todos);
  const isLoading = useAppSelector((state: RootState) => state.todos.isLoading);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(loadTodosAndUsers()).catch(() => {
      setError('Failed to load data. Please try again.');
    });
  }, [dispatch]);

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId) || null;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                setStatus={setStatus}
                setSearchQuery={setSearchQuery}
              />
            </div>
            <div className="block">
              {error && (
                <p className="notification is-danger" data-cy="errorMessage">
                  {error}
                </p>
              )}
              {isLoading && <Loader />}
              {!isLoading && todos.length === 0 && !error && (
                <p className="notification is-warning" data-cy="noTodosMessage">
                  No todos to display
                </p>
              )}
              {!isLoading && todos.length > 0 && (
                <TodoList
                  todos={todos}
                  searchQuery={searchQuery}
                  status={status}
                  selectedTodoId={selectedTodoId}
                  setSelectedTodoId={setSelectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => setSelectedTodoId(null)}
        />
      )}
    </>
  );
};
