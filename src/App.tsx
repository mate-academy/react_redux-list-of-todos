/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { RootState } from './app/store';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state: RootState) => state.todos);
  const filter = useAppSelector((state: RootState) => state.filter);
  const currentTodo = useAppSelector((state: RootState) => state.currentTodo);
  const [isLoader, setIsLoader] = useState(false);

  const getFilteredTodos = () => {
    let newTodos = [...todos];

    if (filter.query) {
      newTodos = newTodos.filter(todo => todo.title.toLowerCase().includes(filter.query.toLowerCase()));
    }

    if (filter.status !== 'all') {
      if (filter.status === 'active') {
        newTodos = newTodos.filter(todo => !todo.completed);
      } else {
        newTodos = newTodos.filter(todo => todo.completed);
      }
    }

    return newTodos;
  };

  const filteredTodos = getFilteredTodos();

  useEffect(() => {
    setIsLoader(true);
    getTodos()
      .then((payload) => {
        dispatch({ type: 'todos/SET', payload });
      })
      .finally(() => {
        setIsLoader(false);
      });
  }, []);

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
              {isLoader
                ? <Loader />
                : <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (<TodoModal />)}
    </>
  );
};
