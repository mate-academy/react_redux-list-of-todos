import { FC } from 'react';
import { Todo } from '../../types/Todo';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setCurrentTodo } from '../../features/currentTodo';
import { useAppSelector } from '../../hooks/useAppSelector';

interface Props {
  todo: Todo;
}

export const TodoItem: FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;

  const selectedTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const openTodo = () => {
    dispatch(setCurrentTodo(todo));
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
        <p className={completed ? 'has-text-success' : 'has-text-danger'}>
          {title}
        </p>
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
              className={`far ${selectedTodo?.id === id ? 'fa-eye-slash' : 'fa-eye'}`}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
