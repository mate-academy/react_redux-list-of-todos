/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { Status } from './features/filter';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState(false);

  function loadTodos() {
    setIsLoading(true);
    getTodos()
      .then(data => dispatch(todosActions.loadTodos(data)))
      .finally(() => setIsLoading(false));
  }

  useEffect(loadTodos, [dispatch]);

  function getVisibleTodos() {
    return todos.filter(todo => {
      const matchesStatus = (() => {
        switch (status) {
          case Status.Active:
            return !todo.completed;
          case Status.Completed:
            return todo.completed;
          default:
            return true;
        }
      })();

      const matchesQuery
        = todo.title.toLowerCase().includes(query.toLowerCase());

      return matchesStatus && matchesQuery;
    });
  }

  const visibleTodos = getVisibleTodos();

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
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList todos={visibleTodos} isLoading />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (<TodoModal />)}
    </>
  );
};
