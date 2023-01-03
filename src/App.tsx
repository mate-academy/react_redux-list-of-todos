/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React, {
  useEffect, useState,
} from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { actions as todosAction } from './features/todos';

import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const [loader, setLoader] = useState(false);

  const dispatch = useAppDispatch();
  const currentGood = useAppSelector(state => state.currentTodo);

  const getTodosFromServer = async () => {
    try {
      setLoader(true);
      const todosFromServer = await getTodos();

      dispatch(todosAction.setTodos(todosFromServer));
    } catch (err: any) {
      throw new Error(err);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getTodosFromServer();
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
              { loader
                ? <Loader />
                : (
                  <TodoList />
                )}
            </div>
          </div>
        </div>
      </div>

      {currentGood && (
        <TodoModal />
      )}
    </>
  );
};
