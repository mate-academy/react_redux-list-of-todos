/* eslint-disable max-len */
import React, { useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todosFromServer = useAppSelector(state => state.todos);
  const todosStatus = useAppSelector(state => state.filter);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    getTodos()
      .then((todos) => dispatch(actions.setTodos(todos)));
  }, []);

  const filteredTodos = useMemo(() => {
    return todosFromServer.filter(todo => {
      const containsQuery = todo.title.toLowerCase().includes(todosStatus.query.toLowerCase());

      switch (todosStatus.status) {
        case 'completed':
          return todo.completed && containsQuery;

        case 'active':
          return !todo.completed && containsQuery;

        case 'all':
        default:
          return containsQuery;
      }
    });
  }, [todosStatus.query, todosStatus.status, todosFromServer]);

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
