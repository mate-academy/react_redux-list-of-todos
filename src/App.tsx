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
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const todos = useAppSelector(state => state.todos);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(todosFromServer => dispatch(todosActions.setTodos(todosFromServer)))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const hasError = !isLoading && isError;
  const hasTodoList = !isLoading && !isError && todos.length;

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
              {isLoading && (<Loader />)}

              {hasError && (<p>Something went wrong</p>)}

              {hasTodoList && (<TodoList />)}
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
