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
import { todosSlice } from './features/todos';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const currentTodo = useAppSelector(state => state.currentTodo);

  const handleLoading = () => {
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    {
      getTodos()
        .then(data => {
          dispatch(todosSlice.actions.loadTodos(data));
        })
        .finally(() => handleLoading());
    }
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

              {!loading && <TodoList />}

              {currentTodo && <TodoModal />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
