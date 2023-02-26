import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch } from '../../app/hooks';
import { actions as todoActions } from '../../features/currentTodo';

type Props = {
  todo: Todo,
  hasSelected: boolean,
};

export const TodoItem: React.FC<Props> = ({ todo, hasSelected }) => {
  const dispatch = useAppDispatch();
  const { id, title, completed } = todo;

  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light': hasSelected,
      })}
    >
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
          onClick={() => dispatch(todoActions.setTodo(todo))}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye': !hasSelected,
                'fa-eye-slash': hasSelected,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
