/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { actions as filterActions } from './features/filter';
import { Status } from './types/Status';
import { Todo } from './types/Todo';
import { actions as currentTodoActions } from './features/currentTodo';

const getFilteredTodos = (
  todos: Todo[],
  query: string,
  filterBy: Status,
) => {
  let filteredTodos = [...todos];

  if (query) {
    const preparedQuery = query.toLowerCase().trim();

    filteredTodos = filteredTodos
      .filter(todo => todo.title.toLowerCase().includes(preparedQuery));
  }

  switch (filterBy) {
    case 'all':
      return filteredTodos;
    case 'active':
      return filteredTodos.filter(todo => !todo.completed);
    case 'completed':
      return filteredTodos.filter(todo => todo.completed);
    default:
      return filteredTodos;
  }
};

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const pickedTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then((res) => dispatch(todosActions.setTodos(res)))
      .finally(() => setLoading(false));
  }, []);

  const setQuery = (query: string) => {
    dispatch(filterActions.setQuery(query));
  };

  const clearQuery = () => {
    dispatch(filterActions.clearQuery());
  };

  const setFilterBy = (status: Status) => {
    dispatch(filterActions.setStatus(status));
  };

  const setPickedTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  const clearPickedTodo = () => {
    dispatch(currentTodoActions.removeTodo());
  };

  const filteredTodos = getFilteredTodos(todos, filter.query, filter.status);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilteredBy={setFilterBy}
                clearQuery={clearQuery}
                setQuery={setQuery}
                query={filter.query}
              />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}
              {!loading && todos.length > 0 && (
                <TodoList
                  todos={filteredTodos}
                  setPickedTodo={setPickedTodo}
                  pickedTodo={pickedTodo}
                />
              )}

            </div>
          </div>
        </div>
      </div>
      {pickedTodo && (
        <TodoModal
          pickedTodo={pickedTodo}
          clearPickedTodo={clearPickedTodo}
        />
      )}
    </>
  );
};
