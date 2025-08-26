/* eslint-disable max-len */
import React, { useState, useEffect, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { setTodos } from './features/todos';
import { setQuery, setStatus } from './features/filter';
import { selectFilteredTodos } from './features/selectors';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const todos = useAppSelector(selectFilteredTodos);

  const [todosLoading, setTodosLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadAllTodos = useCallback(() => {
    setTodosLoading(true);
    setError(null);

    getTodos()
      .then(data => dispatch(setTodos(data)))
      .catch(() => setError('Failed to load todos:'))
      .finally(() => setTodosLoading(false));
  }, [dispatch]);

  useEffect(() => {
    loadAllTodos();
  }, [loadAllTodos]);

  useEffect(() => {
    if (selectedTodo) {
      setUserLoading(true);

      getUser(selectedTodo.userId)
        .then(setSelectedUser)
        .finally(() => setUserLoading(false));
    } else {
      setSelectedUser(null);
    }
  }, [selectedTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              {error && (
                <div className="notification is-danger" data-cy="error">
                  {error}
                </div>
              )}
              <TodoFilter
                filter={filter}
                onChangeFilter={status => dispatch(setStatus(status))}
                query={query}
                onChangeQuery={q => dispatch(setQuery(q))}
                onClearQuery={() => dispatch(setQuery(''))}
              />
            </div>

            <div className="block" data-cy="todos-container">
              {todosLoading ? (
                <Loader data-cy="loader" />
              ) : (
                <TodoList
                  todos={todos}
                  selectedTodo={selectedTodo}
                  onSelect={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        todo={selectedTodo}
        user={selectedUser}
        onClose={() => setSelectedTodo(null)}
        isLoading={userLoading}
      />
    </>
  );
};
