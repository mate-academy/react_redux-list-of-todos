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
  const [isSpinner, setIsSpinner] = useState(true);
  const dispatch = useAppDispatch();
  const todo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    getTodos()
      .then(todos => dispatch(todosActions.setTodos(todos)))
      .finally(() => setIsSpinner(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {isSpinner ? (
              <Loader />
            ) : (
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

      {todo && <TodoModal />}
    </>
  );
};
