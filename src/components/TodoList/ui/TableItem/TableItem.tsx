import React from 'react';
import classNames from 'classnames';
import { Todo } from 'types/Todo';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { actions as currentTodoActions } from 'features/currentTodo';

type Props = {
  todo: Todo;
};

export const TableItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector((state) => state.currentTodo);

  // prettier-ignore
  const setTodo = () => dispatch(
    currentTodoActions.setTodo(todo),
  );

  const { id, completed, title } = todo;

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
            'has-text-success': completed,
            'has-text-danger': !completed,
          })}
        >
          {title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          onClick={setTodo}
          data-cy="selectButton"
          className="button"
          type="button"
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye-slash': currentTodo?.id === id,
                'fa-eye': currentTodo?.id !== id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
