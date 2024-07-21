import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodo';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const isActive = currentTodo?.id === todo.id;

  const handleClick = () => {
    dispatch(setCurrentTodo(todo));
  };

  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light': isActive,
      })}
    >
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
          className={cn({
            'has-text-danger': !todo.completed,
            'has-text-success': todo.completed,
          })}
        >
          {todo.title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={handleClick}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye': !currentTodo,
                'fa-eye-slash': currentTodo,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
