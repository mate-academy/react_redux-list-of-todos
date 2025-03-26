/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components';
import { TodoFilter } from './components';
import { TodoModal } from './components';
import { Loader } from './components';
import { getTodos } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { setTodos } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(data => dispatch(setTodos(data)))
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
              {loading && <Loader />}
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
