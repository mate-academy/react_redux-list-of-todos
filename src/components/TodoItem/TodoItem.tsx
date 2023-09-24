/* eslint-disable no-console */
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getTodo } from '../../redux/selectors';
import { actions } from '../../redux/features/currentTodo';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const currentTodo = useAppSelector(getTodo);

  const dispatch = useAppDispatch();

  const setTodo = (userTodo: Todo) => {
    dispatch(actions.setTodo(userTodo));
  };

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
          className={cn({
            'has-text-success': todo.completed,
            'has-text-danger': !todo.completed,
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
          onClick={() => setTodo(todo)}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye-slash': currentTodo && currentTodo.id === todo.id,
                'fa-eye': !currentTodo || currentTodo.id !== todo.id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
