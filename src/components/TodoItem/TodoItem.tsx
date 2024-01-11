import React, { memo } from 'react';
import { Todo } from '../../types/Todo';
import { useAppDispatch } from '../../app/hooks';
import { actions } from '../../features/currentTodo';

interface Props {
  todo: Todo,
  isSelected?: boolean,
}

export const TodoItem: React.FC<Props> = memo(({
  todo,
  isSelected = false,
}) => {
  const dispatch = useAppDispatch();

  const selectTodo = () => {
    dispatch(actions.setTodo(todo));
  };

  return (
    <tr
      data-cy="todo"
      className={isSelected ? 'has-background-info-light' : ''}
    >
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
          aria-label="Select todo"
          onClick={selectTodo}
        >

          <span className="icon">
            <i className={`far ${isSelected ? 'fa-eye-slash' : 'fa-eye'}`} />
          </span>
        </button>
      </td>
    </tr>
  );
});
