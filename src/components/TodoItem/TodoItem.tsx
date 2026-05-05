import React from 'react';
import cl from 'classnames';

import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();

  const currentTodo = useAppSelector(state => state.currentTodo);
  const isActive = currentTodo?.id === todo.id;

  return (
    <tr data-cy="todo">
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p
          className={cl({
            'has-text-success': todo.completed,
            'has-text-danger': !todo.completed,
          })}
        >
          {todo.title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => dispatch(setCurrentTodo(todo))}
        >
          <span className="icon">
            <i
              className={cl({
                'far fa-eye': !isActive,
                'far fa-eye-slash': isActive,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};