/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useDispatch } from 'react-redux';
import { actions as todosActions } from './features/todos';
import { useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const dispatchTodos = useDispatch();
  const currTodo = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(data => dispatchTodos(todosActions.setTodos(data)))
      .finally(() => setIsLoading(false));
  }, [dispatchTodos]);

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
              {!isLoading && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {!!currTodo && <TodoModal />}
    </>
  );
};
