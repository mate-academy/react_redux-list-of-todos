/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch } from './app/hooks';
import { TODO_ACTIONS_CREATOR } from './features/todos';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then((todos) => dispatch(TODO_ACTIONS_CREATOR.load(todos)))
      .finally(() => setIsLoading(false));
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
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
