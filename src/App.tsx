/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const {
    todos,
    filter,
    currentTodo,
  } = useAppSelector(state => state);
  const { query, status } = filter;

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isSuccessfulyFetched = !isLoading && !errorMessage;

  const filteredTodos = useMemo(() => {
    let filtered = [...todos];

    if (query) {
      filtered = filtered.filter(({ title }) => {
        return title.toLowerCase().includes(query.toLowerCase());
      });
    }

    switch (status) {
      case 'completed':
        filtered = filtered.filter(({ completed }) => completed);
        break;
      case 'active':
        filtered = filtered.filter(({ completed }) => !completed);
        break;
      case 'all':
      default:
        break;
    }

    return filtered;
  }, [todos, query, status]);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(resp => dispatch(todosActions.setTodos(resp)))
      .catch(() => setErrorMessage('Unable to load todos'))
      .finally(() => setIsLoading(false));
  }, []);

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

              {!isLoading && errorMessage && (
                <p>{errorMessage}</p>
              )}

              {isSuccessfulyFetched && (
                <TodoList todos={filteredTodos} />
              )}

            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal todo={currentTodo} />}
    </>
  );
};
