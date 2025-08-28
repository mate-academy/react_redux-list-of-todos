/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { RootState } from './app/store';
import { setTodos } from './features/todos';
import { useAppDispatch, useAppSelector } from './hooks';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();
  const todos = useAppSelector((state: RootState) => state.todos);
  const currentTodo = useAppSelector((state: RootState) => state.currentTodo);
  const filter = useAppSelector((state: RootState) => state.filter);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(data => dispatch(setTodos(data)))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const visibleTodos = todos
    .filter(todo => {
      if (filter.query) {
        return todo.title.toLowerCase().includes(filter.query.toLowerCase());
      }

      return true;
    })
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
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList todos={visibleTodos} isModalOpen={!!currentTodo} />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo ? <TodoModal /> : ''}
    </>
  );
};
