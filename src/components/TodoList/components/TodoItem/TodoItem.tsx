import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
// eslint-disable-next-line max-len
import { actions as currentTodoActions } from '../../../../features/currentTodo';

type Props = { todo: Todo };

export const TodoItem: React.FC<Props> = React.memo(({ todo }) => {
  const { id, completed, title } = todo;

  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const setTodo = () => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  return (
    <tr data-cy="todo">
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed && (
          <>
            <span className="icon" data-cy="iconCompleted">
              <i className="fas fa-check" />
            </span>
          </>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p
          className={classNames({
            'has-text-success': completed,
            'has-text-danger': !completed,
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
          onClick={setTodo}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye': !currentTodo || currentTodo.id !== id,
                'fa-eye-slash': currentTodo && currentTodo.id === id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
});

TodoItem.displayName = 'TodoItem';
