/* eslint-disable max-len */
import React, { useEffect, memo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { fetchTodos } from './features/todo/todoSlice';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = memo(() => {
  const dispatch = useAppDispatch();
  const { todos, loading } = useAppSelector(state => state.todo);
  const { isModaloOpen } = useAppSelector(state => state.modal);

  useEffect(() => {
    dispatch(fetchTodos());
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
              {Boolean(todos.length) && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {isModaloOpen && <TodoModal />}
    </>
  );
});
