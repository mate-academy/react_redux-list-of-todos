/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const hasTodos = useAppSelector(state => state.todos.length > 0);
  const hasSelectedTodo = useAppSelector(state => state.currentTodo !== null);

  useEffect(() => {
    getTodos()
      .then(todos => dispatch(
        actions.setTodos(todos),
      ));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {!hasTodos
              ? <Loader />
              : (
                <>
                  <h1 className="title">Todos:</h1>
                  <div className="block">
                    <TodoFilter />
                  </div>
                  <div className="block">

                    <TodoList />
                  </div>
                </>
              )}

          </div>
        </div>
      </div>
      {hasSelectedTodo && <TodoModal />}

    </>
  );
};
