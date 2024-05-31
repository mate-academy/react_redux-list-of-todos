/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);

  const setTodos = (todosToSet: Todo[]) =>
    dispatch(todosActions.setTodos(todosToSet));

  useEffect(() => {
    getTodos().then(todosFromServer => setTodos(todosFromServer));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              {!todos.length ? <Loader /> : <TodoList />}
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
