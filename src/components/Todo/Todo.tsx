import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as actionsCurrentToDo } from '../../features/currentTodo';

type Props = {
  todo: Todo;
};

export const ToDo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const isCurrentToDo = currentTodo?.id === id;

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
          className={classNames({
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
          onClick={() => dispatch(actionsCurrentToDo.setTodo(todo))}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye': !isCurrentToDo,
                'fa-eye-slash': isCurrentToDo,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
