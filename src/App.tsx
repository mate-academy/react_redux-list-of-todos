/* eslint-disable no-alert */
/* eslint-disable max-len */
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import React, { useEffect, useState } from 'react';

import { getTodos } from './api';
import { Loader } from './components/Loader';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { actions as currentActions } from './features/currentTodo';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseModal = () => dispatch(currentActions.removeTodo());

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(res => dispatch(todosActions.set(res)))
      .catch(() => alert('Something went Wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {isLoading
              ? <Loader />
              : (
                <>
                  <h1 className="title">Todos:</h1>

                  <div className="block">
                    <TodoFilter />
                  </div>

                  <div className="block">
                    <TodoList />
                  </div>
                </>
              )}
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal onClose={handleCloseModal} />}
    </>
  );
};
