import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import React, { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { todosActions } from './features/todos';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getTodos()
      .then(fetchedTodos => dispatch(todosActions.setTodos(fetchedTodos)))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const visibleTodos = useAppSelector(state => {
    const { query, status } = state.filter;

    return state.todos.items.filter(todo => {
      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      const matchesStatus =
        status === 'all'
          ? true
          : status === 'active'
            ? !todo.completed
            : todo.completed;

      return matchesQuery && matchesStatus;
    });
  });

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

              {!isLoading && !hasError && <TodoList todos={visibleTodos} />}
            </div>
          </div>
        </div>
      </div>
      <TodoModal />
    </>
  );
};
