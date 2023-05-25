/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { useAppDispatch } from './app/hooks';

export const App: React.FC = () => {
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();

  const onPageLoad = async () => {
    try {
      const todos = await getTodos();

      dispatch({ type: 'todos/SET', payload: todos });
    } catch {
      setError('unable to get todos');
    }
  };

  useEffect(() => {
    onPageLoad();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {/* {!todos.length
              ? <Loader />
              : ( */}
            <>
              <h1 className="title">Todos:</h1>

              <div className="block">
                <TodoFilter />
              </div>

              <div className="block">
                <TodoList
                  error={error}
                // todos={todos}
                />
              </div>
            </>
            {/* )} */}
          </div>
        </div>
      </div>
      {/* <TodoModal /> */}
    </>
  );
};
