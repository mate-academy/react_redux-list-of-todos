import React from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';

type TSelectedTodoProps = {
  todo: Todo
};

export const SelectedTodo:React.FC<TSelectedTodoProps> = ({ todo }) => {
  return (
    <tr data-cy="todo">
      <td className="is-vcentered">{todo.id}</td>
      <td aria-label="check" className="is-vcentered">
        {todo.completed && (
          <span className="icon">
            <i className="fas fa-check" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p className={classNames({
          'has-text-success': todo.completed,
          'has-text-danger': !todo.completed,
        })}
        >
          {todo.title}
        </p>
      </td>

      <td aria-label="title" className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          aria-label="button to show user info"
        >
          <span className="icon">
            <i className="far fa-eye" />
          </span>
        </button>
      </td>
    </tr>
  );
};
