import React, { useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions } from './features/todos';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const loadTodos = (todosArr: Todo[]) => dispatch(actions.load(todosArr));
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const filter = useAppSelector(state => state.filter);

  useEffect(() => {
    getTodos()
      .then(loadTodos)
      .catch(() => {
        throw new Error("Todos can't be loaded");
      });
  }, []);

  const visibleTodos = useMemo(() => (
    todos.filter(todo => {
      const hasQuery = todo.title.toLowerCase()
        .includes(filter.query.trim().toLowerCase());

      switch (filter.status) {
        case Status.active:
          return !todo.completed && hasQuery;
        case Status.completed:
          return todo.completed && hasQuery;
        default:
          return hasQuery;
      }
    })
  ), [filter, todos]);

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
              {!todos.length ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  currentTodo={currentTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo
        && (
          <TodoModal
            currentTodo={currentTodo}
          />
        )}
    </>
  );
};
