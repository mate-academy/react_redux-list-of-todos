import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as todoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;
  const dispatch = useAppDispatch();
  const currentTodoId = useAppSelector(state => state.currentTodo?.id);

  return (
    <tr data-cy="todo" key={id}>
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed && (
          <span
            className="icon"
            data-cy="iconCompleted"
          >
            <i className="fas fa-check" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p className={classNames(
          {
            'has-text-success': completed,
            'has-text-danger': !completed,
          },
        )}
        >
          {title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => dispatch(todoActions.setTodo(todo))}
        >
          <span className="icon">
            <i className={classNames('far',
              {
                'fa-eye': (currentTodoId !== id),
                'fa-eye-slash': (currentTodoId === id),
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
