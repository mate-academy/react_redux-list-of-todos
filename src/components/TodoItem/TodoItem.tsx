import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const triggerTodo = () => dispatch(currentTodoActions.setCurrentTodo(todo));

  const { title, id, completed } = todo;

  const isCurrentTodo = currentTodo === todo;

  return (
    <tr
      data-cy="todo"
      className={classNames({ 'has-background-info-light': isCurrentTodo })}
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
          onClick={triggerTodo}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye': !isCurrentTodo,
                'fa-eye-slash': isCurrentTodo,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
