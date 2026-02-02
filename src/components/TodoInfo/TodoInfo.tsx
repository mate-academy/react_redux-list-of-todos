import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

interface Props {
  todo: Todo;
  onSelect: (todo: Todo) => void;
  selected: boolean;
}

export const TodoInfoUs: React.FC<Props> = ({ todo, onSelect, selected }) => (
  <tr data-cy="todo">
    <td className="is-vcentered">{todo.id}</td>
    <td
      className="is-vcentered"
      data-cy={cn({
        iconCompleted: todo.completed,
      })}
    >
      {todo.completed ? <i className="fas fa-check"></i> : ''}
    </td>

    <td className="is-vcentered is-expanded">
      <p
        className={cn({
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
        onClick={() => onSelect(todo)}
      >
        <span className="icon">
          {selected ? (
            <i className="far fa-eye-slash" />
          ) : (
            <i className="far fa-eye"></i>
          )}
        </span>
      </button>
    </td>
  </tr>
);

export const TodoInfo: React.FC<Props> = React.memo(TodoInfoUs);
