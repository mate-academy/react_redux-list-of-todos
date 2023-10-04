/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

//  components
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { ErrorBlock } from './components/ErrorBlock';

//  types
import { Todo } from './types/Todo';
import { Status } from './types/Status';

import { getTodos } from './api';
import { filterTodos } from './functions/filterTodos';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { actions as filterActions } from './features/filter';
import { actions as currentTodoActions } from './features/currentTodo';

export const App: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const pickedTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then((res) => dispatch(todosActions.setTodos(res)))
      .catch(error => setErrorMessage(error.message))
      .finally(() => setIsLoading(false));
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

  const filteredTodos = filterTodos(filter.status, filter.query, todos);

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
              {isLoading && <Loader />}
              {!isLoading && errorMessage.length === 0 && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={pickedTodo as Todo}
                  setPickedTodo={setPickedTodo}
                />
              )}
              {!isLoading && errorMessage.length !== 0 && <ErrorBlock errorMessage={errorMessage} />}
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
