/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector((state) => state.currentTodo);
  const todos = useAppSelector((state) => state.todos);
  const filters = useAppSelector((state) => state.filter);
  const [isLoaderActive, setIsLoaderActive] = useState(false);

  useEffect(() => {
    setIsLoaderActive(true);

    getTodos()
      .then((data) => dispatch(todosActions.setTodos(data)))
      .finally(() => setIsLoaderActive(false));
  }, [dispatch]);

  const filteredTodos = useMemo(() => {
    const { query, status } = filters;
    let arr = [...todos];

    if (status) {
      switch (status) {
        case 'active':
          arr = arr.filter(({ completed }) => !completed);
          break;
        case 'completed':
          arr = arr.filter(({ completed }) => completed);
          break;
        default:
          arr = [...todos];
      }
    }

    if (query) {
      arr = arr.filter(({ title }) => {
        return title.toLowerCase().includes(query.toLowerCase());
      });
    }

    return arr;
  }, [todos, filters]);

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
              {isLoaderActive && <Loader />}
              {!isLoaderActive && <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
