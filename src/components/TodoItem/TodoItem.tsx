import React from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { currentTodoActions } from '../../features/currentTodo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
  } = todo;

  const dispatch = useAppDispatch();

  const currentTodo = useAppSelector(state => (
    state.currentTodo?.id === id
  ));

  return (
    <tr
      data-cy="todo"
      className={cn({ 'has-background-info-light': currentTodo })}
    >
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p className={completed
          ? 'has-text-success'
          : 'has-text-danger'}
        >
          {title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => dispatch(currentTodoActions.setTodo(todo))}
        >
          <span className="icon">
            <i
              className={cn('far', currentTodo
                ? 'fa-eye-slash'
                : 'fa-eye')}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
