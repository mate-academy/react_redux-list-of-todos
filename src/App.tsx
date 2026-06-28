/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { User } from './types/User';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setTodos } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => setLoading(true), 200);

    getTodos()
      .then(todosFromServer => dispatch(setTodos(todosFromServer)))
      .finally(() => {
        clearTimeout(delayTimer);
        setTimeout(() => setLoading(false), 500);
      });
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

  const filteredTodos = todos
    .filter(todo =>
      todo.title.toLowerCase().includes(filter.query.toLowerCase()),
    )
    .filter(todo => {
      if (filter.status === 'active') {
        return !todo.completed;
      }

      if (filter.status === 'completed') {
        return todo.completed;
      }

      return true;
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
