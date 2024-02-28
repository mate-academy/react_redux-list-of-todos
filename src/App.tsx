/* eslint-disable max-len */
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import React, { useCallback, useEffect, useState } from 'react';

import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Loader } from './components/Loader';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { actions as todosActions } from './features/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const currentTodo = useAppSelector(state => state.currentTodo);

  const dispatch = useAppDispatch();

  const setTodos = useCallback(
    (value: Todo[]) => {
      dispatch(todosActions.setTodos(value));
    },
    [dispatch],
  );

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then((data: Todo[]) => {
        setTodos(data);
      })
      .catch(() => {
        setTodos([]);
      })
      .finally(() => setIsLoading(false));
  }, [setTodos]);

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
