/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { toggleLoading } from './features/todos';
import { setQuery, setSelectedStatus } from './features/filter';
import { Status } from './types/Status';
import { Todo } from './types/Todo';
import { removeTodo, setTodo } from './features/currentTodo';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos, loading } = useAppSelector((state) => state.todos);
  const { query, selectedStatus } = useAppSelector((state) => state.filter);
  const currentTodo = useAppSelector((state) => state.currentTodo);

  useEffect(() => {
    dispatch(toggleLoading(true));

    getTodos()
      .then(data => {
        dispatch({ type: 'SET_TODOS', payload: data });
      })
      .finally(() => dispatch(toggleLoading(false)));
  }, [dispatch]);

  const handleQueryChange = (newQuery: string) => {
    dispatch(setQuery(newQuery));
  };

  const handleStatusChange = (status: Status) => {
    dispatch(setSelectedStatus(status));
  };

  const getFilteredTodos = (allTodos: Todo[]) => {
    let filteredTodos = [...allTodos];
    const normalisedQuery = query.toLowerCase().trim();

    if (normalisedQuery) {
      filteredTodos = filteredTodos.filter(
        todo => todo.title.toLowerCase().includes(normalisedQuery),
      );
    }

    switch (selectedStatus) {
      case 'active':
        return filteredTodos.filter(todo => !todo.completed);

      case 'completed':
        return filteredTodos.filter(todo => todo.completed);

      default:
        return filteredTodos;
    }
  };

  const setCurrentTodo = (todo: Todo) => {
    return dispatch(setTodo(todo));
  };

  const removeCurrentTodo = () => {
    return dispatch(removeTodo());
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={handleQueryChange}
                onStatusChange={handleStatusChange}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={getFilteredTodos(todos)}
                currentTodo={currentTodo}
                onTodoChose={setCurrentTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {currentTodo
        && (
          <TodoModal
            currentTodo={currentTodo}
            onTodoClose={removeCurrentTodo}
          />
        )}
    </>
  );
};
