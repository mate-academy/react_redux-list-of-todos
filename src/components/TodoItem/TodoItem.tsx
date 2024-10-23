import { FC } from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentTodo, selectCurrentTodo } from '../../features/currentTodo';

interface Props {
  todo: Todo;
}

export const TodoItem: FC<Props> = ({ todo }) => {
  const currentTodo = useAppSelector(selectCurrentTodo);
  const dispatch = useAppDispatch();

  const handleSetCurrentTodo = () => {
    dispatch(setCurrentTodo(todo));
  };

  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light': todo === currentTodo,
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
        <p
          className={cn({
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
          onClick={handleSetCurrentTodo}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye': todo !== currentTodo,
                'fa-eye-slash': todo === currentTodo,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
