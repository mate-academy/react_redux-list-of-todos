/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { actions as todosActions } from './features/todos';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);

  const setTodos = (newTodos: Todo[]) => dispatch(todosActions.setTodos(newTodos));

  useEffect(() => {
    getTodos()
      .then(setTodos);
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
              {todos.length ? <TodoList /> : <Loader /> }
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal /> }
    </>
  );
};
