/* eslint-disable */
import React, { useMemo } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Todo } from '../../types/Todo';

import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList: React.FC = () => {
  const todoList = useAppSelector(state => state.todos);
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);

  const filteredTodos = (todos: Todo[], query: string, status: string) => {
    let newTodos = [...todos];

    if (query) {
      newTodos = newTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (status) {
      if (status === 'active') {
        newTodos = newTodos.filter(todo => !todo.completed);
      } else if (status === 'completed') {
        newTodos = newTodos.filter(todo => todo.completed);
      }
    }

    return newTodos;
  };

  const getFilteredTodos = useMemo(
    () => filteredTodos(todoList, query, status),
    [todoList, query, status],
  );

  if (getFilteredTodos.length === 0) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

  return (
    <>
      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>

            <th>
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>

            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {getFilteredTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </tbody>
      </table>
    </>
  );
};
