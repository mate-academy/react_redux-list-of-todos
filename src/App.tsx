/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectUser = useAppSelector(state => state.currentTodo);
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    setIsLoader(true);
    getTodos()
      .then(data => dispatch(actions.setTodos(data)))
      .finally(() => {
        setIsLoader(false);
      });
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
              {isLoader && (
                <Loader />
              )}
              {!isLoader && (
                <TodoList />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectUser && (
        <TodoModal />
      )}
    </>
  );
};
