/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppSelector } from './app/hooks';
import { actions as actionsTodos } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const todo = useAppSelector((state) => state.currentTodo);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    getTodos()
      .then((res) => {
        dispatch(actionsTodos.addTodos(res));
      })
      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => {
        setIsLoaded(false);
      });
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
                isLoaded
                  ? <Loader />
                  : <TodoList />
              }
            </div>
          </div>
        </div>
      </div>

      {todo && <TodoModal />}
    </>
  );
};
