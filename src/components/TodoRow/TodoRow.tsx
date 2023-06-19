import cn from 'classnames';
import React from 'react';

interface Props {
  id: number;
  isSelectedTodo: boolean;
  completed: boolean;
  title: string;
  onSelect: (id: number) => void;
}

export const TodoRow: React.FC<Props> = ({
  id,
  isSelectedTodo,
  completed,
  title,
  onSelect,
}) => (
  <tr
    data-cy="todo"
    className={cn({
      'has-background-info-light': isSelectedTodo,
    })}
  >
    <td className="is-vcentered">
      {id}
    </td>

    <td className="is-vcentered">
      {completed && (
        <span className="icon" data-cy="iconCompleted">
          <i className="fas fa-check" />
        </span>
      )}
    </td>

    <td className="is-vcentered is-expanded">
      <p
        className={cn({
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
        onClick={() => onSelect(id)}
      >
        <span className="icon">
          <i
            className={cn(
              'far',
              {
                'fa-eye': !isSelectedTodo,
                'fa-eye-slash': isSelectedTodo,
              },
            )}
          />
        </span>
      </button>
    </td>
  </tr>
);
