/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions } from './features/todos';

export const App: React.FC = () => {
  const { todos, loading } = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();
  const todo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    dispatch(actions.setTodosLoading(true));
    getTodos()
      .then(todosFromServer => (
        dispatch(actions.setTodos(todosFromServer))
      ))
      .catch(() => (
        dispatch(actions.setTodosError('Unable to load Todos'))
      ))
      .finally(() => (
        dispatch(actions.setTodosLoading(false))
      ));
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
              {loading ? (
                <Loader />
              ) : (
                <TodoList todos={todos} />
              )}
            </div>
          </div>
        </div>
      </div>
      {todo && (
        <TodoModal />
      )}
    </>
  );
};
