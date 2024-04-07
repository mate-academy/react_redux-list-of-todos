/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const addTodos = useCallback(
    (todosToAdd: Todo[]) => dispatch(todosActions.addTodos(todosToAdd)),
    [dispatch],
  );

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(addTodos)
      .finally(() => {
        setLoading(false);
      });
  }, [addTodos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">{loading ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
