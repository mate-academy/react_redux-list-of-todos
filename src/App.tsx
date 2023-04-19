/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { setTodo } from './features/todos';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [isTodoLoading, setIsTodoLoading] = useState(false);
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const fetchTodos = async () => {
    try {
      setIsTodoLoading(true);
      const data = await getTodos();

      dispatch(setTodo(data));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error when receiving a list of tasks:', error);
    } finally {
      setIsTodoLoading(false);
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
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {isTodoLoading
                ? (
                  <Loader />
                ) : (
                  <TodoList />
                )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
