/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const { error, todos, loading } = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  useEffect(() => {
    dispatch(todosActions.setLoading(true));

    getTodos()
      .then(todosFromServer => {
        dispatch(todosActions.set(todosFromServer));
      })
      .catch(err => dispatch(todosActions.setError(err)))
      .finally(() => dispatch(todosActions.setLoading(false)));
  }, []);

  const preparedTodos = React.useMemo(() => {
    let filteredTodos: Todo[] = todos;

    if (filteredTodos.length === 0) {
      return [];
    }

    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery) {
      filteredTodos = filteredTodos
        .filter(todo => todo.title
          .toLowerCase()
          .includes(normalizedQuery));
    }

    switch (status) {
      case Status.COMPLETED:
        return filteredTodos
          .filter(todo => todo.completed);

      case Status.ACTIVE:
        return filteredTodos
          .filter(todo => !todo.completed);
      default:
        return filteredTodos;
    }
  }, [todos, status, query]);

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
              {error && (
                <p className="notification is-warning">{error}</p>
              )}

              {loading && !error ? (
                <Loader />
              ) : (
                <TodoList todos={preparedTodos} />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
