import React from 'react';
import { toggleCompleted } from '../../features/todos';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app/store';

export const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos);
  const { query, status } = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();

  // Фильтруем todos по query и status
  const filteredTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());
    const matchesStatus =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);

    return matchesQuery && matchesStatus;
  });

  if (!filteredTodos.length) {
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
          <th>Status</th>
          <th>Title</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredTodos.map(todo => (
          <tr
            key={todo.id}
            className={todo.completed ? 'has-background-success-light' : ''}
          >
            <td>{todo.id}</td>
            <td>{todo.completed ? '✔' : ''}</td>
            <td>{todo.title}</td>
            <td>
              <button
                onClick={() => dispatch(toggleCompleted(todo.id))}
                className="button"
              >
                Toggle
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
