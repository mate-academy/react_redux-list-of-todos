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
import { RootState } from './app/store';
import { actions } from './features/todos';

export const App: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const dispatch = useAppDispatch();
  const currentTodos = useAppSelector((state: RootState) => state.currentTodo);

  useEffect(() => {
    getTodos()
      .then(data => dispatch(actions.setTodos(data)))
      .catch(() => (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      ))
      .finally(() => setLoader(false));
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
              {loader && <Loader />}
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      {currentTodos && <TodoModal />}
    </>
  );
};
