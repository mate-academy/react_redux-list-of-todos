import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as actionsCurrentTodo } from '../../features/currentTodo';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo: t }) => {
  const { id, title, completed } = t;
  const { todo } = useAppSelector(state => state.currentTodo);

  const dispatch = useAppDispatch();

  const handleSeeClick = () => {
    dispatch(actionsCurrentTodo.setTodo(t));
  };

  return (
    <tr data-cy="todo" className="">
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
          className={cn('has-text-success', { 'has-text-danger': !completed })}
        >
          {title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          onClick={handleSeeClick}
          data-cy="selectButton"
          className="button"
          type="button"
        >
          {t.id === todo?.id ? (
            <span className="icon">
              <i className="far fa-eye-slash" />
            </span>
          ) : (
            <span className="icon">
              <i className="far fa-eye" />
            </span>
          )}
        </button>
      </td>
    </tr>
  );
};
