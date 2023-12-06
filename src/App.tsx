/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { actions as setTodosActions } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoader(true);

    getTodos()
      .then(resolve => dispatch(setTodosActions.setTodos(resolve)))
      .finally(() => setIsLoader(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            {
              isLoader && (
                <Loader />
              )
            }

            {
              !!todos.length && (
                <>
                  <div className="block">
                    <TodoFilter />
                  </div>
                  <div className="block">
                    <TodoList />
                  </div>
                </>
              )
            }
          </div>
        </div>
      </div>

      {
        currentTodo && (
          <TodoModal />
        )
      }
    </>
  );
};
