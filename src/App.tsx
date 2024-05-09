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
  const currentTodo = useAppSelector(state => state.currentTodo);

  const [loadingTodos, setLoadingTodos] = useState(false);

  useEffect(() => {
    setLoadingTodos(true);

    getTodos()
      .then(data => {
        dispatch(actions.setTodos(data));
      })
      .finally(() => setLoadingTodos(false));
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
              {loadingTodos && <Loader />}
              <TodoList loadingTodos={loadingTodos} />
            </div>
          </div>
        </div>
      </div>

      {!!currentTodo && <TodoModal />}
    </>
  );
};
