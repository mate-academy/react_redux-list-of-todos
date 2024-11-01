/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useTodos } from './hooks/useTodos';
import { filteringTodos } from './utils/FIlteringTodos';
import { todosSlice } from './features/todos';
import { useDispatch } from 'react-redux';

export enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const dispatch = useDispatch();

  const {
    isTodosLoaded,
    filterType,
    query,
    selectedTodo,
    selectedUserId,
    setIsTodosLoaded,
    setFilterType,
    handleResetQuery,
    setQuery,
    anotherTodos,
    filterRightNow,
    queryRightNow,
  } = useTodos();

  useEffect(() => {
    getTodos()
      .then(current => {
        dispatch(todosSlice.actions.add(current));
      })
      .catch(() => console.error('Error while getting todos!'))
      .finally(() => setIsTodosLoaded(true));
  }, []);

  const filteredTodos: Todo[] = useMemo(() => {
    return filteringTodos(anotherTodos, {
      filterType: filterRightNow,
      query: queryRightNow,
    });
  }, [anotherTodos, filterRightNow, queryRightNow]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filterType={filterType}
                onFilter={setFilterType}
                onQuery={setQuery}
                onResetQuery={handleResetQuery}
              />
            </div>

            <div className="block">
              {isTodosLoaded ? (
                <TodoList selectedTodo={selectedTodo} todos={filteredTodos} />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          selectedUserId={selectedUserId!}
        />
      )}
    </>
  );
};
