import React from 'react';
import { TodoType } from '../../types/TodoType';
import classNames from 'classnames';

interface Props {
  todo: TodoType;
  handleTodo: (todo: TodoType) => void;
  isSelected: boolean;
}
export const Todo: React.FC<Props> = ({ todo, handleTodo, isSelected }) => {
  return (
    <tr data-cy="todo">
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed ? (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        ) : null}
      </td>

      <td className="is-vcentered is-expanded">
        <p
          className={classNames({
            ['has-text-success']: todo.completed,
            ['has-text-danger']: !todo.completed,
          })}
        >
          {todo.title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          onClick={() => handleTodo(todo)}
          data-cy="selectButton"
          className="button"
          type="button"
        >
          <span className="icon">
            <i
              className={classNames('far', {
                ['fa-eye']: !isSelected,
                ['fa-eye-slash']: isSelected,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
