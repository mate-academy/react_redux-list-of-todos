import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodo';
import type { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  const filteredTodos = useMemo(() => {
    const q = query.trim().toLowerCase();

    return todos.filter((todo: Todo) => {
      const matchesQuery = !q || todo.title.toLowerCase().includes(q);

      const matchesStatus =
        status === 'all' ||
        (status === 'active' && !todo.completed) ||
        (status === 'completed' && todo.completed);

      return matchesQuery && matchesStatus;
    });
  }, [todos, query, status]);

  if (filteredTodos.length === 0) {
    return (
      <div className="notification is-warning">
        There are no todos matching current filter criteria
      </div>
    );
  }

  return (
    <table className="table is-fullwidth is-striped is-hoverable">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Status</th>
          <th aria-label="Actions" />
        </tr>
      </thead>

      <tbody>
        {filteredTodos.map(todo => (
          <tr key={todo.id}>
            <td>{todo.id}</td>

            <td>{todo.title}</td>

            <td>
              {todo.completed ? (
                <span className="tag is-success">Completed</span>
              ) : (
                <span className="tag is-light">Active</span>
              )}
            </td>

            <td className="has-text-right">
              <button
                type="button"
                className="button is-link is-small"
                onClick={() => dispatch(setCurrentTodo(todo))}
              >
                Show
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
