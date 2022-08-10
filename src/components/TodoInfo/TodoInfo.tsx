import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <>
      <td className="is-vcentered">{todo.id}</td>
      <td
        className="is-vcentered"
      >
        <i className={classNames('fas', {
          'fa-check-square has-text-success': todo.completed,
          'fa-exclamation-triangle has-text-danger': !todo.completed,
        })}
        />
      </td>
      <td className="is-vcentered is-expanded">
        <p className={classNames({
          'has-text-danger': !todo.completed,
        }, {
          'has-text-success': todo.completed,
        })}
        >
          {todo.title}
        </p>
      </td>
    </>
  );
};
