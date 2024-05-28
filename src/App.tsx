import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

import { Loader } from './components/Loader';
import { getTodos } from './api';

import { useDispatch } from 'react-redux';
import { actions as todosActions } from './redux/todos/todos';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const getTodo = async () => {
      try {
        setisLoading(true);

        const res = await getTodos();

        dispatch(todosActions.setTodos(res));
      } catch (err) {
        if (err instanceof Error) {
          window.console.log(err.message);
        }
      } finally {
        setisLoading(false);
      }
    };

    getTodo();
  }, []);

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>

          <div className="block">
            <TodoFilter />
          </div>

          {isLoading ? (
            <Loader />
          ) : (
            <div className="block">
              <TodoList />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
