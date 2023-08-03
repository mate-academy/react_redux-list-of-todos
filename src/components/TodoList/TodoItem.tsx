import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { actions } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

type Props = {
  todo: Todo;
};

export const TodoItem:React.FC<Props> = ({ todo }) => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const { setTodo } = actions;

  const handleSelectCurrentTodo = () => {
    dispatch(setTodo(todo));
  };

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': todo.completed,
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
        <p className={classNames({
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
          onClick={handleSelectCurrentTodo}
        >
          <span className="icon">
            <i className={`far ${currentTodo?.id === todo.id
              ? 'fa-eye-slash'
              : 'fa-eye'
            }`}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
