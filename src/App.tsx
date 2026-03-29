import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos } from './api';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import React, { useEffect, useMemo, useState } from 'react';
import { setTodos } from './features/todos';
import { setSelectedTodo } from './features/currentTodo';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, status: filterStatus } = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const [isTodosLoading, setIsTodosLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsTodosLoading(true);

    getTodos()
      .then(data => dispatch(setTodos(data)))
      .catch(() => setErrorMessage('Failed to load todos'))
      .finally(() => setIsTodosLoading(false));
  }, [dispatch]);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesStatus =
        filterStatus === 'all' ||
        (filterStatus === 'active' && !todo.completed) ||
        (filterStatus === 'completed' && todo.completed);

      return matchesQuery && matchesStatus;
    });
  }, [todos, query, filterStatus]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              {!isTodosLoading && !errorMessage && (
                <>
                  <TodoFilter />
                </>
              )}
            </div>

            <div className="block">
              {isTodosLoading && <Loader />}
              {!isTodosLoading && !errorMessage && (
                <>
                  <TodoList todos={visibleTodos} />
                </>
              )}
            </div>
          </div>
          {errorMessage && <p className="has-text-danger">{errorMessage}</p>}

          {selectedTodo && (
            <TodoModal
              todoTitle={selectedTodo.title}
              userId={selectedTodo.userId}
              todoId={selectedTodo.id}
              isOpen={!!selectedTodo}
              onClose={() => dispatch(setSelectedTodo(null))}
              completed={selectedTodo.completed}
            />
          )}
        </div>
      </div>
    </>
  );
};
