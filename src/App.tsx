/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';

import { useAppDispatch } from './app/hooks';
import { todosSlice } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getTodos()
      .then(elements => {
        dispatch(todosSlice.actions.updateTodos(elements));
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>

          <div className="block">
            <TodoFilter />
          </div>

          <div className="block">{loader ? <Loader /> : <TodoList />}</div>
        </div>
      </div>
    </div>
  );
};
