import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  onSelect: (todo: Todo) => void;
  isSelected: boolean;
};

export const Todofile: React.FC<Props> = ({ todo, onSelect, isSelected }) => {
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
          className={cn(
            todo.completed ? 'has-text-success' : 'has-text-danger',
          )}
        >
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => onSelect(todo)}
        >
          <span className="icon">
            <i
              className={cn(!isSelected ? 'far fa-eye' : 'far fa-eye-slash')}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
