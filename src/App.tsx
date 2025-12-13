/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { actions as filterActions } from './features/filter';
import { actions as slectedTodoActions } from './features/currentTodo';

export const App: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [todosError, setTodosError] = useState<string | null>(null);

  const handleShow = (todo: Todo) => {
    dispatch(slectedTodoActions.newTodo(todo));
  };

  const handleClose = () => {
    dispatch(slectedTodoActions.newTodo(null));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter.status === 'active' && todo.completed) {
      return false;
    }

    if (filter.status === 'completed' && !todo.completed) {
      return false;
    }

    if (
      filter.query &&
      !todo.title.toLowerCase().includes(filter.query.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const handleFilterChange = (query: string) => {
    dispatch(filterActions.changeStatus(query));
  };

  const handleSearchChange = (text: string) => {
    dispatch(filterActions.changeQuery(text));
  };

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(data => {
        dispatch(todosActions.newTodos(data));
      })
      .catch(() => {
        setTodosError('Failed to load todos. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchQuery={filter.query}
                onFilterChange={handleFilterChange}
                onSearchChange={handleSearchChange}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && (
                <>
                  {todosError ? (
                    <p className="has-text-danger">{todosError}</p>
                  ) : (
                    todos.length > 0 && (
                      <TodoList
                        todos={filteredTodos}
                        onShow={handleShow}
                        selectedTodo={selectedTodo}
                      />
                    )
                  )}
                  {selectedTodo && (
                    <TodoModal todo={selectedTodo} onClose={handleClose} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
