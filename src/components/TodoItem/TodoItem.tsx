import { memo } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { useAppDispatch } from '../../app/hooks';
import { addCurrentTodo } from '../../features/currentTodo';

interface Props {
  todo: Todo;
}

const TodoItem = ({ todo }: Props) => {
  const dispatch = useAppDispatch();

  const openModalHandler = () => {
    dispatch(addCurrentTodo(todo));
  };

  return (
    <tr data-cy="todo">
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
          className={classNames({
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
          onClick={openModalHandler}
        >
          <span className="icon">
            <i className="far fa-eye" />
          </span>
        </button>
      </td>
    </tr>
  );
};

export const Item = memo(TodoItem);
