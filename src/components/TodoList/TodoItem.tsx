import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { currentTodoReducer } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../features/useAppSelector';

interface Prop {
  todo: Todo;
}

export const TodoItem: React.FC<Prop> = ({ todo }) => {
  const { id, title, completed } = todo;

  const dispatch = useAppDispatch();
  const activateModal = () => dispatch(currentTodoReducer(todo));
  const currentTodo = useAppSelector(state => state.currentTodo);

  return (
    <tr data-cy="todo">
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
            'has-text-danger': !completed,
            'has-text-success': completed,
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
          onClick={activateModal}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye': currentTodo?.id !== id,
                'fa-eye-slash': currentTodo && currentTodo.id === id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
