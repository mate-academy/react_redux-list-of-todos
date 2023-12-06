/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';

import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({
  todo,
}) => {
  const {
    id,
    title,
    completed,
  } = todo;

  const dispatch = useAppDispatch();

  const selectedTodo = useAppSelector(state => state.currentTodo);

  const handleSelectedTodo = () => {
    dispatch(actions.setTodo(todo));
  };

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': selectedTodo === todo,
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
          onClick={handleSelectedTodo}
        >
          <span className="icon">
            <i
              className={classNames(
                'far', {
                  'fa-eye-slash': selectedTodo,
                  'fa-eye': !selectedTodo,
                },
              )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
