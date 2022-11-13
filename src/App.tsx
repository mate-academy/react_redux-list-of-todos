/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useAppDispatch } from './app/hooks';
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isOpen] = useState(false);
  const [isLoading] = useState(false);

  useEffect(() => {
    const data = async () => {
      try {
        const visibleTodos = await getTodos();

        dispatch(todosActions.addTodos(visibleTodos));
      } catch (error) {
        throw new Error('error');
      }
    };

    data();
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
              {isLoading && <Loader />}
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      {isOpen && <TodoModal />}
    </>
  );
};
