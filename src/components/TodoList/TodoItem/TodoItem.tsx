import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { loadTodo } from '../../../features/currentTodo';
import { useAppSelector } from '../../../hooks/useAppSelector';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export const TodoItem: React.FC<Todo> = (todo: Todo) => {
  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

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
          className={classNames('has-text-success', {
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
          onClick={() => dispatch(loadTodo(todo))}
        >
          <span className="icon">
            <i
              className={classNames({
                'far fa-eye-slash': currentTodo?.id === todo.id,
                'far fa-eye': currentTodo?.id !== todo.id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
