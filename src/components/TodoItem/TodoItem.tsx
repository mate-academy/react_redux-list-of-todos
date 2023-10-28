import React from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const shownTodo = useAppSelector(state => state.currentTodo);

  const isShown = shownTodo?.id === todo.id;

  const handleShowButton = () => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': isShown,
      })}
    >
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span
            className="icon"
            data-cy="iconCompleted"
          >
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p
          className={todo.completed
            ? 'has-text-success'
            : 'has-text-danger'}
        >
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={handleShowButton}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye-slash': isShown,
                'fa-eye': !isShown,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
