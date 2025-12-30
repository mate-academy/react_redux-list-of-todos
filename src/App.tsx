/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './app/store';
import { setTodos } from './features/todos';
import { setQuery, setStatus } from './features/filter';
import { clearCurrentTodo, setCurrentTodo } from './features/currentTodo';
import { clearUser, setUser, startLoading } from './features/user';

export const App: React.FC = () => {
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);

  const currentTodo = useSelector((state: RootState) => state.currentTodo);

  const { user, isLoading } = useSelector((state: RootState) => state.user);

  const { query, status } = useSelector((state: RootState) => state.filter);

  const dispatch = useDispatch<AppDispatch>();

  const todos = useSelector((state: RootState) => state.todos);

  const visibleTodos = todos.filter(todo => {
    const statusMatch =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);

    const titleMatch = todo.title
      .toLocaleLowerCase()
      .includes(query.toLowerCase());

    return statusMatch && titleMatch;
  });

  useEffect(() => {
    setIsLoadingTodos(true);
    getTodos()
      .then(data => dispatch(setTodos(data)))
      .finally(() => setIsLoadingTodos(false));
  }, [dispatch]);

  const handleShowTodo = (todo: Todo) => {
    dispatch(setCurrentTodo(todo));

    dispatch(startLoading());
    getUser(todo.userId).then(userFromServer => dispatch(setUser(userFromServer)));
  };

  const handleCloseModal = () => {
    dispatch(clearCurrentTodo());
    dispatch(clearUser());
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={value => dispatch(setQuery(value))}
                status={status}
                onStatusChange={value => dispatch(setStatus(value))}
              />
            </div>

            <div className="block">
              {isLoadingTodos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onShow={handleShowTodo}
                  selectedTodoId={currentTodo?.id ?? null}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          todo={currentTodo}
          user={user}
          isLoading={isLoading}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
