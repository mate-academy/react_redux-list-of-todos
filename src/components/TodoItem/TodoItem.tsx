import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  itemSelect: boolean;
  onSelectButton: (todo: Todo) => void;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  itemSelect,
  onSelectButton,
}) => (
  <tr data-cy="todo" className={itemSelect ? 'has-background-info-light' : ''}>
    <td className="is-vcentered">{todo.id}</td>
    <td className="is-vcentered">
      {todo.completed && (
        <span className="icon" data-cy="iconCompleted">
          <i className="fas fa-check" />
        </span>
      )}
    </td>

    <td className="is-vcentered is-expanded">
      <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>
        {todo.title}
      </p>
    </td>

    <td className="has-text-right is-vcentered">
      <button
        data-cy="selectButton"
        className="button"
        type="button"
        onClick={() => onSelectButton(todo)}
      >
        <span className="icon">
          <i className={`far ${itemSelect ? 'fa-eye-slash' : 'fa-eye'}`} />
        </span>
      </button>
    </td>
  </tr>
);
