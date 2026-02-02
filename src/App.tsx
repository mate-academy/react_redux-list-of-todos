/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList, TodoFilter, TodoModal, Loader } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { todosSlice } from './features/todos';
import { filterSlice } from './features/filter';

import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  const todosFiltered = todos.filter(todo => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(query.trim().toLowerCase());

    let matchesOption;

    if (status === 'all') {
      matchesOption = todo;
    }

    if (status === 'active') {
      matchesOption = !todo.completed;
    }

    if (status === 'completed') {
      matchesOption = todo.completed;
    }

    return matchesSearch && matchesOption;
  });

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(data => {
        dispatch(todosSlice.actions.setTodos(data));
      })
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
                onSearchChange={value =>
                  dispatch(filterSlice.actions.setQuery(value))
                }
                onOptionChange={value =>
                  dispatch(filterSlice.actions.setStatus(value))
                }
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todosFiltered}
                  onSelected={setSelectedTodo}
                  selectedTodoId={selectedTodo?.id || null}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
