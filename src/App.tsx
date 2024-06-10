/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Filter } from './types/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { actions as todosActions } from './features/todos';
import { actions as filterActions } from './features/filter';

function getFilteredTodos(
  todos: Todo[],
  { status, query }: { status: Filter; query: string },
) {
  let filteredTodos = [...todos];
  const lowerQuery = query.trim().toLowerCase();

  switch (status) {
    case Filter.Active:
      filteredTodos = todos.filter(todo => !todo.completed);
      break;

    case Filter.Completed:
      filteredTodos = todos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  if (lowerQuery) {
    return filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(lowerQuery),
    );
  }

  return filteredTodos;
}

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);
  const filter = useSelector((state: RootState) => state.filter);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const filteredTodos = getFilteredTodos(todos, filter);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(todosFromServer => {
        dispatch(todosActions.setTodos(todosFromServer));
      })
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const handleQueryChange = (newQuery: string) => {
    dispatch(filterActions.setQuery(newQuery));
  };

  const handleFilterChange = (newFilter: Filter) => {
    dispatch(filterActions.setStatus(newFilter));
  };

  const handleTodoSelection = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={filter.query}
                setFilterBy={handleFilterChange}
                setQuery={handleQueryChange}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {filteredTodos.length > 0 ? (
                    <TodoList
                      todos={filteredTodos}
                      selectedTodo={selectedTodo}
                      onTodoSelect={handleTodoSelection}
                    />
                  ) : (
                    <p className="notification is-warning">
                      There are no todos matching current filter criteria
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} onClose={handleCloseModal} />
      )}
    </>
  );
};
