/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { getTodo } from './redux/selectors';
import { getTodos } from './api';
import { actions } from './redux/features/todos';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const currentTodo = useAppSelector(getTodo);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);

        const todosFromServer = await getTodos();

        dispatch(actions.loadTodos(todosFromServer));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
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
              {loading && <Loader />}
              <TodoList loading={loading} />
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
