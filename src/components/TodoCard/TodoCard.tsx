import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useDispatch } from 'react-redux';
import { toggleSelectTodo } from '../../features/todos';

interface TodoCardProps {
  todo: Todo;
}

export const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
  const { id, title, completed } = todo;
  const dispatch = useDispatch();

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
        <p
          className={classNames({
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
          onClick={() => dispatch(toggleSelectTodo(todo.id))}
        >
          <span className="icon">
            <i className="far fa-eye" />
          </span>
        </button>
      </td>
    </tr>
  );
};
