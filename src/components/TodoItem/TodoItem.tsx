import { FC } from 'react';
import { Todo } from '../../types/Todo';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setCurrentTodo } from '../../features/currentTodo';
import { useAppSelector } from '../../hooks/useAppSelector';

interface Props {
  todo: Todo;
}

export const TodoItem: FC<Props> = ({
  todo: { id, title, completed, userId },
}) => {
  const todo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const openTodo = () => {
    dispatch(setCurrentTodo({ id, title, completed, userId }));
  };

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
        {completed ? (
          <p className="has-text-success">{title}</p>
        ) : (
          <p className="has-text-danger">{title}</p>
        )}
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={openTodo}
        >
          <span className="icon">
            <i
              className={`far ${todo?.id === id ? 'fa-eye-slash' : 'fa-eye'}`}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
