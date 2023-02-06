import classNames from 'classnames';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  setTodos: (val: number) => void,
};

export const TodoItem: React.FC<Props> = ({ todo, setTodos }) => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { id, completed, title } = todo;

  return (
    <tr
      className={classNames({
        'has-background-info-light': currentTodo?.id === id,
      })}
      data-cy="todo"
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
        <p className={classNames({
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
          onClick={() => setTodos(id)}

        >
          <span className="icon">
            <i className={classNames('far', {
              'fa-eye-slash': currentTodo?.id === id,
              'far fa-eye': currentTodo?.id !== id,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
