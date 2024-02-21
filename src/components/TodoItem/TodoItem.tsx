import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  onSelectTodo: (todo: Todo) => void;
  currentTodo: Todo | null;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onSelectTodo,
  currentTodo,
}) => {
  const { id, title, completed } = todo;

  const isSelected = todo.id === currentTodo?.id;

  const handleSelectTodo = () => {
    onSelectTodo(todo);
  };

  return (
    <tr
      data-cy="todo"
      className={classNames({ 'has-background-info-light': isSelected })}
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
          aria-label="Select todo"
          onClick={handleSelectTodo}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye': !isSelected,
                'fa-eye-slash': isSelected,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
