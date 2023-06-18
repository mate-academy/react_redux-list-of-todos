import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { actions as todosActions } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { FilterType } from './types/Status';
import { Todo } from './types/Todo';

const getFilteredTodos = (
  todos: Todo[],
  query: string,
  statusFilter: FilterType,
): Todo[] => {
  let newTodos = [...todos];

  if (query) {
    const newQuery = query.toLowerCase().trim();

    newTodos = newTodos.filter(
      todo => todo.title.toLowerCase().includes(newQuery),
    );
  }

  switch (statusFilter) {
    case FilterType.ACTIVE:
      newTodos = newTodos.filter(todo => !todo.completed);
      break;
    case FilterType.COMPLETED:
      newTodos = newTodos.filter(todo => todo.completed);
      break;
    case FilterType.ALL:
    default:
      break;
  }

  return newTodos;
};

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const [isLoading, setisLoading] = useState(true);
  const [hasError, sethasError] = useState(false);

  const visibleTodos = useMemo(
    () => getFilteredTodos(todos, query, status),
    [todos, query, status],
  );

  const getTodosServer = async () => {
    try {
      const arrayTodos = await getTodos();

      dispatch(todosActions.setTodos(arrayTodos));
      setisLoading(false);
      sethasError(false);
    } catch (error) {
      sethasError(true);
    }
  };

  useEffect(() => {
    getTodosServer();
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
              {isLoading && <Loader />}

              {hasError
                ? <p>Error, server is unavailable</p>
                : <TodoList todos={visibleTodos} />}
            </div>
          </div>
          {!isLoading && (
            <p className="notification is-warning">
              There are no todos matching current filter criteria
            </p>
          )}
        </div>
      </div>

      {selectedTodo && (
        <TodoModal />
      )}
    </>
  );
};
