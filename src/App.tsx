/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { actions as actionTodo } from './features/todos';
import { useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(todo => dispatch(actionTodo.setTodos(todo)))
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

            <div className="block">{isLoading ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
