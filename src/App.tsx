/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { actions } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    getTodos()
      .then(result => (dispatch(actions.setTodos(result))));
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
            {todos && todos.length > 0 ? <TodoList /> : <Loader />}
            <div className="block" />
          </div>
        </div>
      </div>

      {currentTodo?.id && <TodoModal />}
    </>
  );
};
