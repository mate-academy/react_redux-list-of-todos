/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { actions as actionsTodos } from './features/todos';
import { getTodos } from './api';

import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentTodo } = useAppSelector((state) => state);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos().then((data) => {
      dispatch(actionsTodos.setTodos(data));
    })
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
              {loading ? (<Loader />) : (<TodoList />)}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (<TodoModal />)}
    </>
  );
};
