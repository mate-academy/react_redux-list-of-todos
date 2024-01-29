import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actionsTodos } from './features/todos';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const todosList = useAppSelector(state => state.todos);
  const isModalShow = useAppSelector(state => state.modalStatus);

  useEffect(() => {
    getTodos()
      .then(data => dispatch(actionsTodos.add(data)))
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

            <div className="block">
              {isLoading ? <Loader /> : <TodoList todos={todosList} />}
            </div>
          </div>
        </div>
      </div>

      {isModalShow && <TodoModal />}
    </>
  );
};
