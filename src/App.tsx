import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import React, { useEffect, useMemo, useState } from 'react';
import { Loader, TodoFilter, TodoList } from './components';
import { getTodos } from './api';
import { setTodos } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const [loading, setLoading] = useState(false);
  const { query, status } = useAppSelector(state => state.filter);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(loaded => dispatch(setTodos(loaded)))
      .catch(() => dispatch(setTodos([])))
      .finally(() => setLoading(false));
  }, [dispatch]);

  const visibleTodos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return todos.filter(todo => {
      const matchesStatus =
        status === 'all' ||
        (status === 'active' && !todo.completed) ||
        (status === 'completed' && todo.completed);

      const matchesQuery = todo.title.toLowerCase().includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [todos, status, query]);

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>

          <div className="block">
            <TodoFilter />
          </div>

          <div className="block">
            {loading ? <Loader /> : <TodoList todos={visibleTodos} />}
          </div>
        </div>
      </div>
    </div>
  );
};
