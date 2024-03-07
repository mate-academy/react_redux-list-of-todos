/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { TodoModal } from './components/TodoModal';

import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { actions } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);

  useEffect(() => {
    getTodos().then((todosFromServer: Todo[]) => {
      dispatch(actions.get(todosFromServer));
    });
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {todos.length ? (
              <>
                <h1 className="title">Todos:</h1>

                <div className="block">
                  <TodoFilter />
                </div>

                <div className="block">
                  <TodoList />
                </div>
              </>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
