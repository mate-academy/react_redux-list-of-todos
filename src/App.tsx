/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import { setAll as setTodos } from './features/todos/todosSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const { selected } = useAppSelector(state => state.todos);

  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getTodos().then(todosFromServer => {
      setIsFetching(false);
      dispatch(setTodos(todosFromServer));
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
              {isFetching ? <Loader /> : <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {selected && <TodoModal />}
    </>
  );
};
