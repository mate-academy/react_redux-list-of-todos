import React from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  isSelected: boolean,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  isSelected,
}) => {
  const {
    id,
    completed,
    title,
  } = todo;
  const dispatch = useDispatch();

  const handlerSetCurrent = (currentTodo: Todo) => {
    dispatch(actions.setTodo(currentTodo));
  };

  return (
    <tr data-cy="todo">
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        {completed ? (
          <p className="has-text-success">
            {title}
          </p>
        ) : (
          <p className="has-text-danger">
            {title}
          </p>
        )}
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => handlerSetCurrent(todo)}
        >
          <span className="icon">
            {isSelected ? (
              <i className="far fa-eye-slash" />
            ) : (
              <i className="far fa-eye" />
            )}
          </span>
        </button>
      </td>
    </tr>
  );
};
