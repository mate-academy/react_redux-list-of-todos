import classNames from 'classnames';
import { Todo } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';

type TodoItemProps = {
  todo: Todo;
};
export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': todo.id === currentTodo?.id,
      })}
      key={todo.id}
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
          className={classNames(
            `has-text-${todo.completed ? 'success' : 'danger'}`,
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
          aria-label="Select todo"
          onClick={() => {
            dispatch(actions.setTodo(todo));
          }}
        >
          <span className="icon">
            <i
              className={classNames(
                'far',
                `fa-eye${todo.id === currentTodo?.id ? '-slash' : ''}`,
              )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
