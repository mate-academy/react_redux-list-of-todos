import React from 'react';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentTodo } from '../../features/currentTodo';
import classNames from 'classnames';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { id, title, completed } = todo;

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
        <p className={completed ? 'has-text-success' : 'has-text-danger'}>
          {title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => dispatch(setCurrentTodo(todo))}
        >
          <span className="icon">
            <i
              className={classNames(
                'far',
                currentTodo?.id === todo.id ? 'fa-eye-slash' : 'fa-eye',
              )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
