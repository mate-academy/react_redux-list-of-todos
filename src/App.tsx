import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

import { getTodos, getUser } from './api';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { set, todosLoading } from './features/todos';
import { clearCurrentTodo, setUser, todoSelected, userLoading } from './features/currentTodo';
import { clearQuery, setQuery, setStatus } from './features/filter';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const { items: todos, loading } = useAppSelector(state => state.todos);
  const { status: statusFilter, query: searchQuery } = useAppSelector(state => state.filter);
  const { selectedTodo, user: selectedUser, userLoading: isUserLoading } = useAppSelector(state => state.currentTodo);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(todosLoading(true));

    getTodos()
      .then(loadedTodos => dispatch(set(loadedTodos)))
      .finally(() => dispatch(todosLoading(false)));
  }, [dispatch]);

  const filteredTodos = todos
    .filter(todo =>
      statusFilter === 'all'
        ? true
        : statusFilter === 'active'
          ? !todo.completed
          : todo.completed
    )
    .filter(todo => todo.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleTodoSelect = (todo: Todo) => {
    dispatch(todoSelected(todo));
    dispatch(userLoading(true));

    getUser(todo.userId)
      .then(user => dispatch(setUser(user)))
      .finally(() => dispatch(userLoading(false)))
  };

  const handleCloseModal = () => dispatch(clearCurrentTodo());
  const handleStatusChange = (status: Status) => dispatch(setStatus(status));
  const handleSearchChange = (query: string) => dispatch(setQuery(query));
  const handleSearchClear = () => dispatch(clearQuery());

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                statusFilter={statusFilter}
                searchQuery={searchQuery}
                onStatusChange={handleStatusChange}
                onSearchChange={handleSearchChange}
                onSearchClear={handleSearchClear}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onTodoSelect={handleTodoSelect}
                  selectedTodoId={selectedTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          isLoading={isUserLoading}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
