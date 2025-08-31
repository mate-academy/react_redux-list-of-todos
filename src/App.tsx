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
import { setTodos } from './features/todos';

export enum Select {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const App: React.FC = () => {
  const [isLoader, setIsLoader] = useState<boolean>(false);

  const { status: selectedValue, query: searchQueryTitle } = useAppSelector(
    state => state.filter,
  );

  const singleTodo = useAppSelector(state => state.currentTodo);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoader(true);
    getTodos()
      .then(data => {
        dispatch(setTodos(data));
      })
      // eslint-disable-next-line no-console
      .catch(error => console.error(`Something went wrong: ${error}`))
      .finally(() => setIsLoader(false));
  }, [searchQueryTitle, selectedValue, dispatch]);

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
              {isLoader && <Loader />}
              <TodoList />
            </div>
          </div>
        </div>
      </div>
      {singleTodo && <TodoModal />}
    </>
  );
};
