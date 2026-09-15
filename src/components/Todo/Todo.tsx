import classNames from 'classnames';
import { Todo as TodoType } from '../../types/Todo';

interface Props {
  todo: TodoType;
  currentTodoId: number;
  onSelect: (todo: TodoType) => void;
}

export const Todo = ({ todo, currentTodoId, onSelect }: Props) => {
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
          className={classNames(
            todo.completed ? 'has-text-success' : 'has-text-danger',
          )}
        >
          {todo.title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => onSelect(todo)}
        >
          <span className="icon">
            <i
              className={classNames(
                'far',
                todo.id === currentTodoId ? 'fa-eye-slash' : 'fa-eye',
              )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
