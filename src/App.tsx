/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { setTodos } from './features/todos';
import { useAppDispatch } from './app/hooks';

export const App: React.FC = () => {
  const [isToDosLoading, setIsToDosLoading] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsToDosLoading(true);

    getTodos()
      .then(todos => {
        dispatch(setTodos(todos));
      })
      .finally(() => setIsToDosLoading(false));
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
              {isToDosLoading ? <Loader /> : <TodoList />}
            </div>
          </div>
        </div>
      </div>
      <TodoModal />
    </>
  );
};
