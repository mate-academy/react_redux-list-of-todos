import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  selectedTodoId?: number;
  onSelect?: (todo: Todo | null) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  selectedTodoId,
  onSelect = () => {},
}) => {
  const { id, completed, title } = todo;

  return (
    <tr key={id} data-cy="todo">
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
        {id === selectedTodoId ? (
          <button
            data-cy="selectButton"
            className="button"
            type="button"
            onClick={() => onSelect(null)}
          >
            <span className="icon">
              <i className="far fa-eye-slash" />
            </span>
          </button>
        ) : (
          <button
            data-cy="selectButton"
            className="button"
            type="button"
            onClick={() => onSelect(todo)}
          >
            <span className="icon">
              <i className="far fa-eye" />
            </span>
          </button>
        )}
      </td>
    </tr>
  );
};
