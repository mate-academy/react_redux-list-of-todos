import React from 'react';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import classNames from 'classnames';
import {
  actions as currentTodoActions,
  currentTodoSelector,
} from '../../features/currentTodo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const currentTodo = useAppSelector(currentTodoSelector);
  const dispatch = useAppDispatch();
  const isSelected = currentTodo?.id === todo.id;

  return (
    <tr
      data-cy="todo"
      className={classNames({ 'has-background-info-light': isSelected })}
    >
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
          className={classNames({
            'has-text-danger': !todo.completed,
            'has-text-success': todo.completed,
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
          onClick={() => dispatch(currentTodoActions.setTodo(todo))}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye-slash': isSelected,
                'fa-eye': !isSelected,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
