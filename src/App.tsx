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

export enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const {
    todos,
    isTodosLoaded,
    filterType,
    query,
    selectedTodo,
    selectedUserId,
    setTodos,
    setIsTodosLoaded,
    setFilterType,
    setSelectedUserId,
    handleResetQuery,
    handleTodoReset,
    setQuery,
    setSelectedTodo,
  } = useTodos();

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => console.error('Error while getting todos!'))
      .finally(() => setIsTodosLoaded(true));
  }, []);

  const filteredTodos: Todo[] = useMemo(() => {
    return filteringTodos(todos, { filterType, query });
  }, [todos, filterType, query]);

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
                <TodoList
                  onTodoSelect={setSelectedTodo}
                  onUserIdSelect={setSelectedUserId}
                  selectedTodo={selectedTodo}
                  todos={filteredTodos}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          handleTodoReset={handleTodoReset}
          selectedTodo={selectedTodo}
          selectedUserId={selectedUserId}
        />
      )}
    </>
  );
};
