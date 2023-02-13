import React from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { Todo } from '../../../types/Todo';
import { actions as currentTodoActions } from '../../../features/currentTodo';

type Props = {
  todo: Todo,
  isCurrent: boolean,
};

export const TodoItem: React.FC<Props> = React.memo(({ todo, isCurrent }) => {
  const { id, title, completed } = todo;
  const dispatch = useDispatch();

  return (
    <tr data-cy="todo" key={id}>
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
          className={cn({
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
          onClick={() => dispatch(currentTodoActions.setTodo(todo))}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye': !isCurrent,
                'fa-eye-slash': isCurrent,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
});
