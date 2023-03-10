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
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const getApiTodos = async () => {
    setIsLoading(true);

    try {
      const data = await getTodos();

      dispatch(todosActions.setTodos(data));
    } catch {
      Promise.reject(new Error('error'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getApiTodos();
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
              {isLoading
                ? <Loader />
                : <TodoList /> }
            </div>
          </div>
        </div>
      </div>

      {currentTodo !== null && <TodoModal />}
    </>
  );
};
