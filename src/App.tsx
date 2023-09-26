/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { actions as currentActions } from './features/currentTodo';
import { User } from './types/User';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const showSelectedUser = (todo: Todo) => dispatch(currentActions.setTodo(todo));
  const removeSelectedUser = () => dispatch(currentActions.removeTodo());

  const isInQuery = (arg: string) => {
    return !!arg.toLowerCase().includes(query.toLowerCase());
  };

  const visibleTodos = useMemo(() => {
    return todos?.filter(todo => {
      const matchesQuery = isInQuery(todo.title || '');

      if (status === 'completed') {
        return !todo.completed && matchesQuery;
      }

      if (status === 'active') {
        return todo.completed && matchesQuery;
      }

      return matchesQuery;
    });
  }, [todos, status, query]);

  useEffect(() => {
    if (!todos) {
      getTodos().then(
        res => dispatch(todosActions.setTodos(res)),
      );
    }

    if (selectedTodo) {
      getUser(selectedTodo.userId).then(
        res => setSelectedUser(res),
      );
    } else {
      setSelectedUser(null);
    }
  }, [selectedTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                status={status}
              />
            </div>

            <div className="block">
              {!todos && <Loader />}
              {!!todos && (
                <TodoList
                  visibleTodos={visibleTodos}
                  showSelectedUser={showSelectedUser}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          selectedUser={selectedUser}
          removeSelectedUser={removeSelectedUser}
        />
      )}
    </>
  );
};
