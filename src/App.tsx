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
import { setTodos } from './features/todos';
import { Status } from './features/filter';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const currentTodo = useAppSelector((state) => state.currentTodo);
  const todos = useAppSelector((state) => state.todos);
  const { query, status } = useAppSelector((state) => state.filter);

  const visibleTodos = useMemo(() => {
    return todos.filter(({ title, completed }: Todo) => {
      const lowerCasedQuery = query.toLowerCase().trim();
      const lowerCasedTodoTitle = title.toLowerCase();

      let isCorrectStatus;

      switch (status) {
        case Status.ACTIVE:
          isCorrectStatus = !completed;
          break;

        case Status.COMPLETED:
          isCorrectStatus = completed;
          break;

        default:
          isCorrectStatus = true;
      }

      return lowerCasedTodoTitle.includes(lowerCasedQuery) && isCorrectStatus;
    });
  }, [todos, status, query]);

  useEffect(() => {
    getTodos().then((fetchedTodos) => {
      dispatch(setTodos(fetchedTodos));
    });
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
              {!todos.length ? (
                <Loader />
              ) : (
                <TodoList todos={visibleTodos} />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
