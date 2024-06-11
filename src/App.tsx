/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { useAppDispatch } from './app/hooks';
import { getTodos } from './api';
import { actions as todosAction } from './features/todos';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [loader, setLoader] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getTodos()
      .then(newTodos => {
        dispatch(todosAction.setTodos(newTodos));
      })
      .finally(() => setLoader(false));
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

            <div className="block">{loader ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>
      <TodoModal />
    </>
  );
};
