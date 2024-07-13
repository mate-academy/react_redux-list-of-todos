/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Status } from './types/Status';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './app/hooks';
import filterSlice from './features/filter';
import { currentTodoSlice } from './features/currentTodo';
import { todosSlice } from './features/todos';

export const App: React.FC = () => {
  const [load, setLoad] = useState(false);
  const todos = useAppSelector(state => state.todos);
  const dispatch = useDispatch();
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const setQuery = (value: string) => {
    dispatch(filterSlice.actions.setQuery(value));
  };

  const setStatus = (value: Status) => {
    dispatch(filterSlice.actions.setStatus(value));
  };

  const setSelectedTodo = (todo: Todo) =>
    dispatch(currentTodoSlice.actions.setSelectedTodo(todo));

  const todoClose = () => dispatch(currentTodoSlice.actions.closeTodo(null));

  const setTodos = useCallback(
    (data: Todo[]) => dispatch(todosSlice.actions.setTodos(data)),
    [dispatch],
  );

  useEffect(() => {
    setLoad(true);

    getTodos()
      .then(setTodos)
      .catch(error => {
        // eslint-disable-next-line no-console
        console.warn(error);
      })
      .finally(() => setLoad(false));
  }, [setTodos]);

  const filteredTodos = useMemo(() => {
    return todos
      .filter(todo => {
        switch (status) {
          case Status.completed:
            return todo.completed;

          case Status.active:
            return !todo.completed;

          default:
            return true;
        }
      })
      .filter(todo =>
        todo.title.toLowerCase().trim().includes(query.trim().toLowerCase()),
      );
  }, [query, todos, status]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                status={status}
                setStatus={setStatus}
              />
            </div>

            <div className="block">
              {load ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodo?.id}
                  onTodoSelected={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && <TodoModal todo={selectedTodo} close={todoClose} />}
    </>
  );
};
