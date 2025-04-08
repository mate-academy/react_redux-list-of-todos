import React from 'react';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../app/hooks';

interface Props {
  todo: Todo;
  onSelect: (todo: Todo) => void;
}

export const TodoRow: React.FC<Props> = ({ todo, onSelect }) => {
  const { id, title, completed } = todo;
  const currentTodo = useAppSelector(state => state.currentTodo);
  const isSelected = currentTodo?.id === id;

  return (
    <tr data-cy="todo" className={completed ? 'has-background-info-light' : ''}>
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p className={completed ? 'has-text-success' : 'has-text-danger'}>
          {title}
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
            <i className={`far fa-eye${isSelected ? '-slash' : ''}`} />
          </span>
        </button>
      </td>
    </tr>
  );
};
