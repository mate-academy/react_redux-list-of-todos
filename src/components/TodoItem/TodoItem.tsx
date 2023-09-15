import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../app/hooks';

type Props = {
  todo: Todo,
  setCurrent: (newTodo: Todo) => {},
};

export const TodoItem: React.FC<Props> = ({
  todo,
  setCurrent,
}) => {
  const selectedTodoId = useAppSelector(state => state.currentTodo?.id);

  return (
    <tr data-cy="todo">
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed
          && (
            <span className="icon" data-cy="iconCompleted">
              <i className="fas fa-check" />
            </span>
          )}
      </td>

      <td className="is-vcentered is-expanded">
        <p className={cn({
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
          onClick={() => setCurrent(todo)}
        >
          <span className="icon">
            <i className={cn('far', {
              'fa-eye': todo.id !== selectedTodoId,
              'fa-eye-slash': todo.id === selectedTodoId,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
