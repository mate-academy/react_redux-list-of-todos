/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppSelector } from './app/hooks';
import { useDispatch } from 'react-redux';
import { getTodos } from './api';
import { todosActions } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState(false);
  const [todosError, setTodosError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(todosFromServer => dispatch(todosActions.addTodos(todosFromServer)))
      .catch(() => setTodosError('Try again later'))
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
              {isLoading && <Loader />}
              {!isLoading && <TodoList />}
              {todosError && <p>{todosError}</p>}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal currentTodo={currentTodo} />}
    </>
  );
};
