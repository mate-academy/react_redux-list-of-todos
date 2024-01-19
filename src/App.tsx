/* eslint-disable react-hooks/exhaustive-deps */
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
import { action } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const hasSelectedTodo = useAppSelector(state => state.currentTodo !== null);

  useEffect(() => {
    getTodos()
      .then(todosList => dispatch(
        action.setTodos(todosList),
      ));
  }, []);

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

      {hasSelectedTodo && <TodoModal />}
    </>
  );
};
