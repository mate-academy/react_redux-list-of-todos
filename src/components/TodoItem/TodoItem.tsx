import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch } from '../../app/store';
import { currentTodoSlice } from '../../features/currentTodo';

type Props = {
  todo: Todo;
  currentTodoId: number;
};

export const TodoItem: React.FC<Props> = ({ todo, currentTodoId }) => {
  const { id, completed, title } = todo;
  const dispatch = useAppDispatch();

  const add = (item: Todo) => {
    dispatch(currentTodoSlice.actions.setCurrentTodo(item));
  };

  return (
    <tr
      key={id}
      data-cy="todo"
      className={classNames({
        'has-background-info-light': id === currentTodoId,
      })}
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
          onClick={() => add(todo)}
        >
          <span className="icon">
            {id !== currentTodoId ? (
              <i className="far fa-eye" />
            ) : (
              <i className="far fa-eye-slash" />
            )}
          </span>
        </button>
      </td>
    </tr>
  );
};
