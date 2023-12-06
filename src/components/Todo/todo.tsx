/* eslint-disable max-len */
import React from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';

type Props = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export const Todo: React.FC<Props> = ({
  id, title, completed, userId,
}) => {
  const selectedTodos = useAppSelector((state) => state.currentTodo);
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(actions.setTodo({
      id, title, completed, userId,
    }));
  }

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
          className={completed
            ? 'has-text-success' : 'has-text-danger'}
        >
          {title}
          {userId}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => handleClick()}
        >
          <span className="icon">
            <i className={cn('far', {
              'fa-eye': selectedTodos?.id !== id,
              'fa-eye-slash': selectedTodos?.id === id,
            })}
            />
          </span>
        </button>
      </td>
    </tr>

  );
};
