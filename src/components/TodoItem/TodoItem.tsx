import React from 'react';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import classNames from 'classnames';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const onTodoClick = () => {
    dispatch(currentTodoActions.setTodo(todo));
  };

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
          onClick={onTodoClick}
        >
          <span className="icon">
            <i
              className={classNames({
                'far fa-eye': !currentTodo || currentTodo.id !== id,
                'far fa-eye-slash': currentTodo && currentTodo.id === id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
