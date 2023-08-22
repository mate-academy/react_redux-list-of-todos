import React from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const isTodoSelected = id === currentTodo?.id;

  const handleSelectClick = () => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light': isTodoSelected,
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
          onClick={handleSelectClick}
        >
          <span className="icon">
            <i className={cn('far', {
              'fa-eye': !isTodoSelected,
              'fa-eye-slash': isTodoSelected,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
