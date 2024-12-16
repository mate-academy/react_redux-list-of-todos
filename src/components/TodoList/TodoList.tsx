/* eslint-disable */
import React, { useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import { TodoStatusFilter } from '../../constants/StatusFilter';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList: React.FC = () => {
  const { todos } = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  const filteredTodos = useMemo(() => {
    if (status === TodoStatusFilter.All && !query) {
      return todos;
    }

    return todos.filter(todo => {
      const matchesStatus =
        status === TodoStatusFilter.All ||
        (status === TodoStatusFilter.Completed && todo.completed) ||
        (status === TodoStatusFilter.Active && !todo.completed);

      const matchesQuery =
        !query || todo.title.toLowerCase().includes(query.toLowerCase());

      return matchesStatus && matchesQuery;
    });
  }, [status, query, todos]);

  if (filteredTodos.length === 0) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

  return (
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
        {filteredTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </tbody>
    </table>
  );
};
