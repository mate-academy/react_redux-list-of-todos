import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const chosenTodo = useAppSelector(state => state.currentTodo);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTodos()
      .then(todos => {
        dispatch(actions.setTodos(todos));
      })
      .finally(() => setIsLoading(true));
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

            <div className="block">{isLoading ? <TodoList /> : <Loader />}</div>
          </div>
        </div>
      </div>

      {chosenTodo && <TodoModal />}
    </>
  );
};
