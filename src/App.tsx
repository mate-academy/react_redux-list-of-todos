/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const closeModal = () => dispatch({ type: 'currentTodo/REMOVE' });

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        dispatch({ type: 'todos/SET', payload: todosFromServer });
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
              {
                (todos).length
                  ? <TodoList />
                  : <Loader />
              }
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal closeModal={closeModal} />
      )}
    </>
  );
};
