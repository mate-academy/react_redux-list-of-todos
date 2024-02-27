/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Notification } from './components/Notification';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    getTodos()
      .then(res => dispatch({ type: 'todos/SET', payload: res }))
      .catch(() => setError('Ooops! Somethig went wrong...'))
      .finally(() => setLoading(false));
  }, [dispatch]);

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
              {loading && <Loader />}

              {!loading && error ? (
                <Notification message={error} />
              ) : (
                <TodoList todos={todos} />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
