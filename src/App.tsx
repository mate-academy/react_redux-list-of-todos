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
import {
  getLocalStorage,
  setLocalStorage,
  useAppDispatch,
  useAppSelector,
} from './app/hooks';
import { actionsTodo } from './features/currentTodo';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos);
  const currentTodo = useAppSelector((state) => state.currentTodo);

  const setTodos = (data: Todo[]) => {
    dispatch(actionsTodos.setTodos(data));
  };

  const setTodo = (data: Todo) => {
    dispatch(actionsTodo.setTodo(data));
  };

  useEffect(() => {
    if (getLocalStorage('todos') !== null) {
      setTodos(getLocalStorage('todos'));
    }

    getTodos().then((data) => {
      setLocalStorage('todos', data);
      setTodos(getLocalStorage('todos'));
    });

    if (getLocalStorage('currentTodo') !== null) {
      setTodo(getLocalStorage('currentTodo'));
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
              {todos.length > 0 ? <TodoList /> : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo !== null && <TodoModal />}
    </>
  );
};
