import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useAppSelector, useAppDispatch } from './app/hook';
import { todosSlice } from './features/todos';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { getFilteredTodos } from './utils/getFilteredTodos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector(state => state.todos);
  const query = useAppSelector(state => state.filter.query);
  const selectedCondition = useAppSelector(state => state.filter.status);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getTodos()
      .then(res => dispatch(todosSlice.actions.setTodos(res)))
      .catch(() => setError('Failed to load todos. Please try again later.'))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const visibleTodos = getFilteredTodos(todos, {
    query,
    selectedFilter: selectedCondition,
  });

  const isShow = !isLoading && todos.length > 0;

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
              {error && <p className="has-text-danger">{error}</p>}
              {isShow && <TodoList todos={visibleTodos} />}
              {!isShow && !isLoading && !error && <p>No todos available.</p>}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
