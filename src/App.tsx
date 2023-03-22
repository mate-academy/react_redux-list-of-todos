/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<Todo | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(result => {
        setTodos(result);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filterTodos = useCallback((
    filterType: string,
    queryValue: string,
    allTodos: Todo[],
  ) => {
    const filteredQuery = allTodos.filter(todo => todo.title.toLocaleLowerCase().includes(queryValue.toLocaleLowerCase().trim()));
    const active = filteredQuery.filter(todo => !todo.completed);
    const completed = filteredQuery.filter(todo => todo.completed);

    switch (filterType) {
      case FilterType.all:
        return !queryValue ? allTodos : filteredQuery;
      case FilterType.active:
        return active;
      case FilterType.completed:
        return completed;
      default:
        throw new Error('No filter type');
    }
  }, []);

  const visibleTodos = useMemo(() => filterTodos(filter, query, todos), [filter, query, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filter={filter}
                setQuery={setQuery}
                setFilter={setFilter}
              />
            </div>

            <div className="block">
              {hasError && (
                <h3 style={{ color: 'tomato' }}>
                  Todos loading error
                </h3>
              )}
              {isLoading && <Loader />}
              {!isLoading && !hasError && (
                <TodoList
                  todos={visibleTodos}
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  isLoading={isLoading}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedItem && (
        <TodoModal
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}
    </>
  );
};
