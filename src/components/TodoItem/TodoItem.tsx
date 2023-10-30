import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector((state) => state.currentTodo);

  const isSelected = currentTodo?.id === todo.id;
  const eyeClass = isSelected ? 'far fa-eye-slash' : 'far fa-eye';
  const rowClass = isSelected ? 'has-background-info-light' : '';
  const titleColorClass = todo.completed
    ? 'has-text-success'
    : 'has-text-danger';

  const setCurrentTodo = () => {
    dispatch(actions.setTodo(todo));
  };

  return (
    <tr data-cy="todo" className={rowClass}>
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p className={titleColorClass}>{todo.title}</p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={setCurrentTodo}
        >
          <span className="icon">
            <i className={eyeClass} />
          </span>
        </button>
      </td>
    </tr>
  );
};
