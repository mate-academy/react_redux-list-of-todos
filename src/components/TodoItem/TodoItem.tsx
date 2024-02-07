/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../app/hooks';

interface Props {
  todo: Todo,
}

export const TodoItem: React.FC<Props> = ({
  todo,
}) => {
  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const {
    id, completed, title,
  } = todo;

  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light': currentTodo?.id === id,
      })}
    >
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span
            className="icon"
            data-cy="iconCompleted"
          >
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p className={cn({
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
          onClick={() => dispatch(actions.setTodo(todo))}
        >
          <span className="icon">
            <i className={cn('far',
              {
                'fa-eye': currentTodo?.id !== id,
                'fa-eye-slash': currentTodo?.id === id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
