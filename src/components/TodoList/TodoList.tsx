import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../app/hooks';

interface Props {
  // todos: Todo[];
  selectedTodoId?: number;
  onSelectTodo: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  // todos,
  selectedTodoId,
  onSelectTodo,
}) => {
  const { items: todos } = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(state => state.filter);

  const visibleTodos = todos.filter(todo => {
    const matchesQuery = todo.title
      .toLowerCase()
      .includes(query.toLowerCase().trim());

    const matchedStatus =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);

    return matchesQuery && matchedStatus;
  });

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

          <th />
        </tr>
      </thead>

      <tbody>
        {visibleTodos.map(({ id, title, completed, userId }) => (
          <tr
            key={id}
            data-cy="todo"
            className={classNames({
              'has-background-info-light': id === selectedTodoId,
            })}
          >
            <td className="is-vcentered">{id}</td>

            <td className="is-vcentered">
              {completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>

            <td className="is-vcentered is-expanded">
              <p
                className={classNames({
                  'has-text-success': completed,
                  'has-text-danger': !completed,
                })}
              >
                {title}
              </p>
            </td>

            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  onSelectTodo({
                    id,
                    title,
                    completed,
                    userId,
                  });
                }}
              >
                <span className="icon">
                  {selectedTodoId === id ? (
                    <i className="far fa-eye-slash" />
                  ) : (
                    <i className="far fa-eye" />
                  )}
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
