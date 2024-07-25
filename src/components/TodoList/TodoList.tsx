/* eslint-disable */
import React from 'react';

import { useAppSelector } from '../../app/hooks';
import { Loader } from '../Loader';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const {
    todos: { data, loading, error },
    filter,
  } = useAppSelector(state => ({
    todos: state.todos,
    filter: state.filter,
  }));

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="notification is-warning">{error}</p>;
  }

  const filteredTodos = data
    .filter(({ completed }) => {
      switch (filter.status) {
        case 'completed':
          return completed;

        case 'active':
          return !completed;

        default:
          return true;
      }
    })
    .filter(({ title }) => {
      if (filter.query) {
        const titleLower = title.toLowerCase();
        const filterLower = filter.query.toLowerCase();

        return titleLower.includes(filterLower);
      }

      return true;
    });

  if (!data.length) {
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
