/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import {
  Loader, TodoFilter, TodoList, TodoModal,
} from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions } from './features/todos';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getTodos()
      .then((todosFromServer) => {
        dispatch(actions.setTodos(todosFromServer));
      })
      .catch(() => {
        throw new Error('Please try later');
      })
      .finally(() => setLoading(false));
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
              {loading && (
                <Loader />
              )}

              {!loading && todos.length > 0 && (
                <TodoList
                  todos={todos}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal />
      )}
    </>
  );
};
