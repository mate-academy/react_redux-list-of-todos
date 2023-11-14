import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as actionsCurrTodo } from '../../features/currentTodo';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    id: TodoId,
    title,
    completed,
  } = todo;

  const { selectedTodo } = useAppSelector((state) => state.todo);
  const dispatchTodo = useAppDispatch();

  const handleSelectTodo = () => (
    dispatchTodo(actionsCurrTodo.selectTodo(todo))
  );

  const { id } = selectedTodo || {};

  const isSelected = TodoId === id;

  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light': isSelected,
      })}
    >
      <td className="is-vcentered">{TodoId}</td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p className={cn({
          'has-text-success': completed,
          'has-text-danger': !completed,
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
          onClick={handleSelectTodo}
        >
          <span className="icon">
            <i className={cn('far', {
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
