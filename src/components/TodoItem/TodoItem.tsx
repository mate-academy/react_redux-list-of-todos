import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../app/hooks';

type Props = {
  todo: Todo;
  onSelect: (todo: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, onSelect }) => {
  const { id, title, completed } = todo;
  const currentTodo = useAppSelector(state => state.currentTodo);

  const handleSelectTodo = () => {
    onSelect(todo);
  };

  return (
    <tr data-cy="todo">
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed ? (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        ) : (
          ''
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p
          className={cn({
            'has-text-danger': !completed,
            'has-text-success': completed,
          })}
        >
          {title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button data-cy="selectButton" className="button" type="button">
          {id === currentTodo?.id ? (
            <span className="icon">
              <i className="far fa-eye-slash" />
            </span>
          ) : (
            <span className="icon" onClick={handleSelectTodo}>
              <i className="far fa-eye" />
            </span>
          )}
        </button>
      </td>
    </tr>
  );
};
