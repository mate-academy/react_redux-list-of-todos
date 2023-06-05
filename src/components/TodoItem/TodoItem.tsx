import { useAppDispatch } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions } from '../../features/currentTodo';

interface Props {
  todo: Todo;
}

export const TodoItem = ({ todo }: Props) => {
  const dispatch = useAppDispatch();
  const {
    id,
    title,
    completed,
  } = todo;

  const handleEyeClick = () => {
    dispatch(actions.setTodo(todo));
  };

  return (
    <tr data-cy="todo">
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed && (
          <span
            className="icon"
            data-cy="iconCompleted"
          >
            <i className="fas fa-check" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p
          className={completed ? 'has-text-success' : 'has-text-danger'}
        >
          {title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={handleEyeClick}
        >
          <span className="icon">
            <i className="far fa-eye" />
          </span>
        </button>
      </td>
    </tr>
  );
};
