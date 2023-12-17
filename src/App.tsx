/* eslint-disable max-len */
import React, { useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions } from './features/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const todosFromServer = useAppSelector(state => state.todos);
  const todoStatus = useAppSelector(state => state.filter);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getTodos()
      .then((todos) => dispatch(actions.setTodos(todos)));
  }, []);

  const prepareQuery = (todo: Todo) => todo.title.toLowerCase().includes(todoStatus.query.toLowerCase());

  const filteredTodos = useMemo(() => {
    return todosFromServer.filter(todo => {
      const preparedQuery = prepareQuery(todo);

      switch (todoStatus.status) {
        case 'completed':
          return todo.completed && preparedQuery;

        case 'active':
          return !todo.completed && preparedQuery;

        case 'all':
        default:
          return preparedQuery;
      }
    });
  }, [todoStatus.query, todoStatus.status, todosFromServer]);

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
              {todosFromServer.length === 0
                ? <Loader />
                : <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} />}
    </>
  );
};
