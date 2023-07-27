/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions } from './features/todos';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const loadTodos = async () => {
    try {
      setIsLoading(true);
      const loadedTodos = await getTodos();

      dispatch(actions.setTodos(loadedTodos));
    } catch (error) {
      throw new Error('Error loading todos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
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
              {isLoading && <Loader /> }
              {!isLoading && <TodoList isLoading={isLoading} /> }
            </div>
          </div>
        </div>
      </div>
      {currentTodo && <TodoModal />}
    </>
  );
};
