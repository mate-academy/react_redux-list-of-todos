import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const isSelected = currentTodo?.id === todo.id;

  const setCurrentTodo = (curTodo: Todo) => (
    dispatch(currentTodoActions.setTodo(curTodo)));

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': isSelected,
      })}
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
        <p className={classNames({
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
          onClick={() => setCurrentTodo(todo)}
        >
          <span className="icon">
            <i className={classNames('far', {
              'fa-eye': !isSelected,
              'fa-eye-slash': isSelected,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
