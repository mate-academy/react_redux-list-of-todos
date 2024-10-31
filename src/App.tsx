import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { FilterStatus } from './utils/FilterStatus';
import { getTodos } from './api';

import { Todo } from './types/Todo';
import { useAppDispatch, useAppSelector } from './features/hooks';
import { actions as todoActions } from './features/todos';

function handleFiltration(data: Todo[], query: string, filterBy: string) {
  let visibleData = [...data];

  if (filterBy) {
    switch (filterBy) {
      case FilterStatus.ACTIVE:
        visibleData = [...data].filter(todo => !todo.completed);
        break;
      case FilterStatus.COMPLETED:
        visibleData = [...data].filter(todo => todo.completed);
        break;
    }
  }

  if (query) {
    visibleData = visibleData.filter(todo => {
      const normalizedQuery = query.trim().toLowerCase();

      return todo.title.trim().toLowerCase().includes(normalizedQuery);
    });
  }

  return visibleData;
}

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const filterBy = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const dispatch = useAppDispatch();
  const setTodos = (data: Todo[]) => dispatch(todoActions.add(data));

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const visibleData = handleFiltration(todos, query, filterBy);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filterBy={filterBy} query={query} />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              <TodoList todos={visibleData} />
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal currentTodo={currentTodo} />}
    </>
  );
};
