/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { User } from './types/User';
import { addTodos } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  const filteredTodos = todos.filter(todo => {
    const normalizedSearch = todo.title
      .toLowerCase()
      .includes(filter.query.trim().toLowerCase());

    let matchesOption = true;

    if (filter.status === 'active') {
      matchesOption = !todo.completed;
    }

    if (filter.status === 'completed') {
      matchesOption = todo.completed;
    }

    return normalizedSearch && matchesOption;
  });

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(data => dispatch(addTodos(data)))
      .finally(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (!currentTodo) {
      return;
    }

    setModalLoading(true);
    getUser(currentTodo?.userId)
      .then(userFromServer => setUser(userFromServer))
      .finally(() => setModalLoading(false));
  }, [currentTodo]);

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
              <Loader loading={loading} />
              <TodoList todos={filteredTodos} />
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal loading={modalLoading} user={user} />}
    </>
  );
};
