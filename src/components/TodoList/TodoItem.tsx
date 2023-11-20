import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const handleSelectTodo = () => {
    dispatch(actions.setTodo(todo));
  };

  return (
    <tr
      data-cy="todo"
      className={currentTodo?.id === todo.id
        ? 'has-background-info-light'
        : ''}
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
          onClick={handleSelectTodo}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye': currentTodo?.id !== todo.id,
                'fa-eye-slash': currentTodo?.id === todo.id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
