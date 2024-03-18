/* eslint-disable */
import React from 'react';
import cn from 'classnames';
import { v4 as getId } from 'uuid'

import { Todo as TodoType } from '../../types/Todo';

type Props = {
  todo: TodoType;
  currentTodoId: number;
  setCurrentTodo: (todo: TodoType) => void;
};

export const Todo: React.FC<Props> = ({
  todo,
  currentTodoId,
  setCurrentTodo,
}) => {
  const { id, title, completed } = todo;

  return (
    <tr
      key={getId()}
      data-cy="todo"
      className={cn({
        'has-background-info-light': id === currentTodoId,
      })}
    >
      <td className="is-vcentered">{id}</td>

      {
        completed
          ? (
            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            </td>
          ) : (
            <td className="is-vcentered"></td>
          )
      }

      <td className="is-vcentered is-expanded">
        <p
          className={cn({
            'has-text-danger': !completed,
            'has-text-success': completed
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
          onClick={() => setCurrentTodo(todo)}
        >
          <span className="icon">
            <i
              className={cn(
                "far",
                {
                  "fa-eye": todo.id !== id,
                  "fa-eye-slash": todo.id === id,
                }
              )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
