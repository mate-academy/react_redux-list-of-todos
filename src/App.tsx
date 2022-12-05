/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch } from './app/hooks';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      getTodos()
        .then(todosFromServer => {
          dispatch(todosActions.getTodos(todosFromServer));
          setIsLoaded(true);
        });
    } catch (error) {
      setIsLoaded(false);
    }
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
              {
                !isLoaded
                  ? <Loader />
                  : <TodoList />
              }
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
