/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos, getVisibleTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todoActions } from './features/todos';
import { actions as filterActions } from './features/filter';
import { actions as currentTodoActions } from './features/currentTodo';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchTodosFromAPI = async () => {
      try {
        setHasError(false);
        setIsLoading(true);
        const todoArray = await getTodos();

        dispatch(todoActions.set(todoArray));
      } catch (error) {
        setHasError(true);
        throw new Error('Error fetching todos');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodosFromAPI();
  }, []);

  const visibleTodos = getVisibleTodos(todos, status, query);

  const onSelectClick = (value: Status) => {
    dispatch(filterActions.setStatus(value));
  };

  const onInputChange = (input: string) => {
    dispatch(filterActions.setQuery(input));
  };

  const onModalButtonClick = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelectClick={onSelectClick}
                onInputChange={onInputChange}
                query={query}
              />
            </div>

            {hasError && (
              <p className="notification is-warning">
                Error fetching todos
              </p>
            )}

            {!visibleTodos.length && query && (
              <p className="notification is-warning">
                There are no todos matching current filter criteria
              </p>
            )}

            {isLoading && (
              <Loader />
            )}

            {visibleTodos.length > 0 && (
              <div className="block">
                <TodoList
                  visibleTodos={visibleTodos}
                  onModalButtonClick={onModalButtonClick}
                  isModalButtonClicked={!!currentTodo}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal />
      )}
    </>
  );
};
