/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { setTodos } from './features/todos';
import { setQuery, setStatus } from './features/filter';
import { clearCurrentTodo, setCurrentTodo } from './features/currentTodo';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const dispatch = useDispatch();

  const { todos, filter, currentTodo } = useSelector((state: RootState) => ({
    todos: state.todos,
    filter: state.filter,
    currentTodo: state.currentTodo,
  }));

  const [loading, setLoading] = useState(false);

  const filteredTodos = todos.filter(todo => {
    const matchesStatus =
      filter.status === 'all' ||
      (filter.status === 'active' && !todo.completed) ||
      (filter.status === 'completed' && todo.completed);

    const matchesQuery = todo.title
      .toLowerCase()
      .includes(filter.query.toLowerCase());

    return matchesStatus && matchesQuery;
  });

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(data => dispatch(setTodos(data)))
      .finally(() => setLoading(false));
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedStatus={filter.status}
                onSelectedStatus={status => dispatch(setStatus(status))}
                searchValue={filter.query}
                onSearchValue={query => dispatch(setQuery(query))}
                onClearSearch={() => dispatch(setQuery(''))}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  actualTodo={filteredTodos}
                  selectedTodo={currentTodo}
                  onSelectedTodo={(todo: Todo | null) =>
                    dispatch(todo ? setCurrentTodo(todo) : clearCurrentTodo())
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          selectedTodo={currentTodo}
          onClose={() => dispatch(clearCurrentTodo())}
        />
      )}
    </>
  );
};
