/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

import { actionsTodos } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actionsTodo } from './features/currentTodo';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    if (localStorage.getItem('todos') !== null) {
      dispatch(actionsTodos.setTodos(JSON.parse(localStorage.getItem('todos') || '')));
    } else {
      getTodos().then((data) => {
        dispatch(actionsTodos.setTodos(data));
        localStorage.setItem('todos', JSON.stringify(data));
      });
    }

    if (localStorage.getItem('currentTodo') !== null) {
      dispatch(
        actionsTodo.setTodo(
          JSON.parse(localStorage.getItem('currentTodo') || ''),
        ),
      );
    }
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
              {todos.length > 0 ? (
                <TodoList />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo !== null && (
        <TodoModal />
      )}
    </>
  );
};
