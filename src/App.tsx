/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { getTodos, getUser } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { setCurrent } from './features/currentTodo';
import { setTodos } from './features/todos';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const dispatch = useDispatch();

  const { query, status } = useSelector((state: RootState) => state.filter);

  const selectedTodo = useSelector((state: RootState) => state.currentTodo);

  const todos = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(loadedTodos => dispatch(setTodos(loadedTodos)))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    setIsUserLoading(true);
    setSelectedUser(null);
    getUser(selectedTodo.userId)
      .then(setSelectedUser)
      .finally(() => setIsUserLoading(false));
  }, [selectedTodo]);

  const handleClose = () => {
    dispatch(setCurrent(null));
    setSelectedUser(null);
  };

  const visibleTodos = todos.filter(todo => {
    const matchesStatus =
      status === 'all' ||
      (status === 'completed' && todo.completed) ||
      (status === 'active' && !todo.completed);
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    return matchesStatus && matchesQuery;
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
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  onSelect={todo => dispatch(setCurrent(todo))}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          selectedUser={selectedUser}
          isLoading={isUserLoading}
          onClose={handleClose}
        />
      )}
    </>
  );
};
