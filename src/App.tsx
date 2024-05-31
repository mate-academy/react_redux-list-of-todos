/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Todo } from './types/Todo';
import { actions as todoActions } from './features/todos';
import { getTodos } from './api';

export const App: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  const setTodos = (setNewTodo: Todo[]) =>
    dispatch(todoActions.setTodos(setNewTodo));

  useEffect(() => {
    getTodos().then(todosFromServer => setTodos(todosFromServer));
  });

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

      {currentTodo && <TodoModal />}
    </>
  );
};
