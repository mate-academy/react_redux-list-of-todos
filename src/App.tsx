/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

function filteringTodos(
  array: Todo[],
  settings: { filterType: Filter; query: string },
) {
  let arrayCopy = [...array];

  if (settings.filterType === Filter.Active) {
    arrayCopy = arrayCopy.filter(element => element.completed === false);
  }

  if (settings.filterType === Filter.Completed) {
    arrayCopy = arrayCopy.filter(element => element.completed === true);
  }

  if (settings.query) {
    arrayCopy = arrayCopy.filter(element =>
      element.title
        .toLowerCase()
        .includes(settings.query.toLowerCase().trimStart()),
    );
  }

  return arrayCopy;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isTodosLoaded, setIsTodosLoaded] = useState(false);

  const [filterType, setFilterType] = useState<Filter>(Filter.All);
  const [query, setQuery] = useState('');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);

  const handleResetQuery = () => {
    setQuery('');
  };

  const handleTodoReset = (value: Todo | null) => {
    setSelectedTodo(value);
  };

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
