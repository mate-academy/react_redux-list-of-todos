import { useDispatch } from 'react-redux';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { setTodo } from '../../features/currentTodo';
import { useAppSelector } from '../../app/store';

type Props = {
  todo: Todo;
};

export const TodoItem = ({ todo }: Props) => {
  const dispatch = useDispatch();
  const currentTodo = useAppSelector(store => store.currentTodo);

  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light': todo.id === currentTodo?.id,
      })}
    >
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className={cn('fas fa-check')} />
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
          onClick={() => dispatch(setTodo(todo))}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye': currentTodo?.id !== todo.id,
                'fa-eye-slash': currentTodo?.id === todo.id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
