import React from 'react';
import classnames from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currTodoActions } from '../../features/currentTodo';

type Props = {
  todo: Todo
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const setTodo = () => dispatch(
    currTodoActions.setTodo(todo),
  );

  const isCurrentTodo = currentTodo?.id === todo.id;

  return (
    <tr
      data-cy="todo"
      className={classnames({
        'has-background-info-light': isCurrentTodo,
      })}
    >
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed
          && (
            <span
              className="icon"
              data-cy="iconCompleted"
            >
              <i className="fas fa-check" />
            </span>
          )}
      </td>

      <td className="is-vcentered is-expanded">
        <p className={classnames({
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
          onClick={setTodo}
        >
          <span className="icon">
            <i className={classnames('far', {
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
