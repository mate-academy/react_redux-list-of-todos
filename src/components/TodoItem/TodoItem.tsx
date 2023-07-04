import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const handleSelect = () => {
    dispatch(actions.setTodo(todo));
  };

  const isSelected = currentTodo?.id === id;

  return (
    <tr
      data-cy="todo"
      className={classNames(
        { 'has-background-light': isSelected },
      )}
    >
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed && (
          <span
            className="icon"
            data-cy="iconCompleted"
          >
            <i className="fas fa-check" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p className={classNames(
          { 'has-text-danger': !completed },
          { 'has-text-success': completed },
        )}
        >
          {title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={handleSelect}
        >
          <span className="icon">
            <i className={classNames(
              { 'far fa-eye': !isSelected },
              { 'far fa-eye-slash': isSelected },
            )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
