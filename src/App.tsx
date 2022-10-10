/* eslint-disable import/no-cycle */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as AddTodosAction } from './features/todos';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  const filteredTodos = todos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()))
    .filter(todo => {
      switch (status) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return todo;
      }
    });

  useEffect(() => {
    getTodos()
      .then((todosFromServer: Todo[]) => dispatch(AddTodosAction.addTodos(todosFromServer)))
      .finally(() => setIsLoading(false));
  }, [setIsLoading, AddTodosAction.addTodos]);

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
              <TodoList
                filteredTodos={filteredTodos}
                loading={isLoading}
              />
              {isLoading && <Loader />}
            </div>
          </div>
        </div>
      </div>

      { currentTodo && (
        <TodoModal />
      )}

    </>
  );
};
