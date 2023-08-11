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

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const isSelected = currentTodo !== null;

  useEffect(() => {
    getTodos()
      .then(loadTodos => dispatch(todosActions.setTodos(loadTodos)));
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
              {todos.length ? <TodoList /> : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {isSelected && <TodoModal />}
    </>
  );
};
