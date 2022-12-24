/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos: Todo[] = useAppSelector(state => state.todos);
  const currentTodo: Todo | null = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    getTodos().then((todoList: Todo[]) => dispatch(todosActions.setTodos(todoList)));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          {todos.length > 0 ? (
            <div className="box">
              <h1 className="title">Todos:</h1>

              <div className="block">
                <TodoFilter />
              </div>

              <div className="block">
                <TodoList />
              </div>
            </div>
          ) : <Loader />}
        </div>
      </div>

      {currentTodo ? <TodoModal /> : null}
    </>
  );
};
