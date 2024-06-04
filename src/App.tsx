/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions as actionsTodos } from './features/todos';

export const App: React.FC = () => {
  const { todo } = useAppSelector(state => state.currentTodo);
  const { todos } = useAppSelector(state => state.todos);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      getTodos().then(t => {
        return dispatch(actionsTodos.setTodo(t));
      });
    }, 300);
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
              {!todos.length ? <Loader /> : <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {todo && <TodoModal />}
    </>
  );
};
