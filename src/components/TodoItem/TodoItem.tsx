import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface TodoItemProps {
  todo: Todo;
  onClick: (todo: Todo) => void;
  isActive: boolean;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onClick,
  isActive,
}) => {
  return (
    <tr data-cy="todo">
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p
          className={classNames({
            'has-text-danger': !todo.completed,
            'has-text-success': todo.completed,
          })}
        >
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => onClick(todo)}
          aria-label={isActive ? 'Hide details' : 'Show details'}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye-slash': isActive,
                'fa-eye': !isActive,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
