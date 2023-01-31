/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';

import { getTodos } from './api';
import { actions as todosActions } from './reducers/todosReducer';
import { useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const todo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    getTodos()
      .then(data => dispatch(todosActions.set(data)));
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
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      {todo && (
        <TodoModal />
      )}
    </>
  );
};
