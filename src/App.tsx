/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { SortType } from './types/SortType';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { ERROR_MESSAGE } from './helpers/variables';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as actionsTodos } from './features/todos';

function getPreparedTodos(
  todos: Todo[],
  query: string,
  optionChange: SortType,
): Todo[] {
  let getNewTodos = [...todos];

  getNewTodos = getNewTodos.filter(todo => {
    switch (optionChange) {
      case SortType.Active:
        return !todo.completed;
      case SortType.Complited:
        return todo.completed;
      case SortType.All:
      default:
        return todo;
    }
  });

  if (query) {
    getNewTodos = getNewTodos.filter(({ title }) => {
      const preparedTitle = title.trim().toLowerCase();
      const preparedQuery = query.trim().toLowerCase();

      return preparedTitle.includes(preparedQuery);
    });
  }

  return getNewTodos;
}

export const App: React.FC = () => {
  const { query } = useAppSelector((state) => state.query);
  const { todos } = useAppSelector((state) => state.todos);
  const { status } = useAppSelector((state) => state.status);

  const dispatchTodos = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { selectedTodo } = useAppSelector((state) => state.todo);

  const visibleTodos = getPreparedTodos(todos, query, status as SortType);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then((res) => dispatchTodos(actionsTodos.setTodos(res)))
      // eslint-disable-next-line no-console
      .catch(() => console.error(ERROR_MESSAGE))
      .finally(() => setIsLoading(false));
  }, []);

  const isfilterError = !isLoading && !visibleTodos.length;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>
            {isfilterError
              ? (
                <h3 className="filter-error">There are no todos matching current filter criteria</h3>
              )
              : (
                <div className="block">
                  {isLoading
                    ? <Loader />
                    : (
                      <TodoList
                        todos={visibleTodos}
                      />
                    )}
                </div>
              )}
          </div>
        </div>
      </div>

      {!!selectedTodo && (
        <TodoModal />
      )}
    </>
  );
};
