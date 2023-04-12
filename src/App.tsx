/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch } from './app/hooks';
import { action as actionTodos } from './features/todos';
import { Notifications } from './components/Notifications';

export const App: React.FC = () => {
  const dispatchTodos = useAppDispatch();
  const [isError, setIsError] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  const fetchTodos = async () => {
    try {
      setIsError(false);
      setIsLoad(true);
      const todosFromAPI = await getTodos();

      dispatchTodos(actionTodos.setTodos(todosFromAPI));
    } catch {
      setIsError(true);
    } finally {
      setIsLoad(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {!isLoad && !isError && <h1 className="title">Todos:</h1>}

            {isLoad && <Loader />}

            {isError && <Notifications />}

            {!isError && !isLoad && (
              <>
                <div className="block">
                  <TodoFilter />
                </div>

                <div className="block">
                  <TodoList />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <TodoModal />
    </>
  );
};
