/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
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
import { setCurrentTodo } from './features/currentTodo';
import type { StatusFilter } from './types/StatusFilter';
import { setQuery, setStatus } from './features/filter';

export const App: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const dispatch = useAppDispatch();
  const [isTodosLoading, setIsTodosLoading] = useState(false);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const visibleTodos = todos.filter(todo => {
    if (status === 'active' && todo.completed) {
      return false;
    }

    if (status === 'completed' && !todo.completed) {
      return false;
    }

    if (query && !todo.title.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }

    return true;
  });

  const handleSelectTodo = (todo: Todo) => {
    if (currentTodo?.id === todo.id) {
      dispatch(setCurrentTodo(null));
      setSelectedUser(null);
      setIsUserLoading(false);

      return;
    }

    dispatch(setCurrentTodo(todo));
    setSelectedUser(null);
    setIsUserLoading(true);
    getUser(todo.userId)
      .then(user => setSelectedUser(user))
      .finally(() => setIsUserLoading(false));
  };

  const handleCloseModal = () => {
    dispatch(setCurrentTodo(null));
    setSelectedUser(null);
    setIsUserLoading(false);
  };

  const handleStatusFilterChange = (currentFilter: StatusFilter) => {
    dispatch(setStatus(currentFilter));
  };

  const handleSearchQueryChange = (currentQuery: string) => {
    dispatch(setQuery(currentQuery));
  };

  const handleClearSearch = () => {
    dispatch(setQuery(''));
  };

  useEffect(() => {
    setIsTodosLoading(true);
    getTodos()
      .then(data => dispatch(setTodos(data)))
      .finally(() => setIsTodosLoading(false));
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                statusFilter={status}
                searchQuery={query}
                onStatusFilterChange={handleStatusFilterChange}
                onSearchQueryChange={handleSearchQueryChange}
                onClearSearch={handleClearSearch}
              />
            </div>

            <div className="block">
              {isTodosLoading && <Loader />}
              {!isTodosLoading && (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={currentTodo}
                  onSelectTodo={handleSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          selectedTodo={currentTodo}
          selectedUser={selectedUser}
          isUserLoading={isUserLoading}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
