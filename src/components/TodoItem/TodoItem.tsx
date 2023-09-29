import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  setPickedTodo: (pickedTodo: Todo) => void,
  pickedTodo: Todo | null,
};

export const TodoItem:React.FC<Props> = ({
  todo,
  setPickedTodo,
  pickedTodo,
}) => {
  const {
    id,
    title,
    completed,
  } = todo;

  return (
    <tr
      data-cy="todo"
      className=""
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
          onClick={() => setPickedTodo(todo)}
        >
          <span className="icon">
            <i className={classNames('far', {
              'fa-eye': pickedTodo?.id !== todo.id,
              'fa-eye-slash': pickedTodo?.id === todo.id,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
