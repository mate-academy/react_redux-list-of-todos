/* eslint-disable */
import React, { useEffect } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => {
    const { todos } = state;
    const { query, status } = state.filter;

    return todos.filter(todo => {
      const matchesField =
        status === Status.ALL ||
        (status === Status.COMPLETED && todo.completed) ||
        (status === Status.ACTIVE && !todo.completed);

      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.trim().toLowerCase());

      return matchesField && matchesQuery;
    });
  });

  return todos.length === 0 ? (
    <p className="notification is-warning">
      There are no todos matching current filter criteria
    </p>
  ) : (
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
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </tbody>
    </table>
  );
};
