import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader/Loader';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { todosSlice } from './features/todos';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(data => dispatch(todosSlice.actions.setTodos(data)))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            {isLoading ? (
              <div className="has-text-centered">
                <Loader />
              </div>
            ) : (
              <div className="block">
                <TodoList />
              </div>
            )}
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
