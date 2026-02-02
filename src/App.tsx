/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Filter } from './types/Filter';
import { useAppDispatch, useAppSelector } from './app/store';
import { todosSlice } from './features/todos';
import { filterSlice } from './features/filter';
import { currentTodoSlice } from './features/currentTodo';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const [loadStatus, setLoadStatus] = useState(false);
  const [todosToShow, setTodosToShow] = useState(todos);

  useEffect(() => {
    setLoadStatus(false);

    getTodos().then((rawTodos: Todo[]) => {
      dispatch(todosSlice.actions.save(rawTodos));
      setLoadStatus(true);
    });
  }, [dispatch]);

  useEffect(() => {
    if (!todos) {
      return;
    }

    const tds = todos.filter(todo => {
      switch (status) {
        case 'active': {
          if (!todo.completed && todo.title.includes(query)) {
            return true;
          }

          return false;
        }

        case 'completed': {
          if (todo.completed && todo.title.includes(query)) {
            return true;
          }

          return false;
        }

        case 'all':
          if (todo.title.includes(query)) {
            return true;
          }

          return false;
      }
    });

    setTodosToShow(tds);
  }, [todos, query, setTodosToShow, status]);

  const onSort = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newFilter = event.target.value as Filter;

      if (status !== newFilter) {
        dispatch(filterSlice.actions.updateStatus(newFilter));
      }
    },
    [status, dispatch],
  );

  const appliedQuery = useCallback(
    (value: string) =>
      dispatch(filterSlice.actions.updateQuery(value.toLowerCase())),
    [dispatch],
  );

  const onSelect = (todo: Todo | null) => {
    if (todo) {
      return dispatch(currentTodoSlice.actions.set(todo));
    }

    return dispatch(currentTodoSlice.actions.clean());
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onSort={onSort} onAppliedQuery={appliedQuery} />
            </div>

            <div className="block">
              {!loadStatus && <Loader />}
              <TodoList
                todos={todosToShow}
                onSelect={onSelect}
                selected={currentTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {currentTodo ? (
        <TodoModal
          todo={currentTodo}
          userId={currentTodo.userId}
          onModalWindowClose={() => onSelect(null)}
        />
      ) : (
        ''
      )}
    </>
  );
};
