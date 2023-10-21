import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentActions } from '../../features/currentTodo';

type Props = {
  todo: Todo;
};

export const CurrentTodo: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const setTodo = (t: Todo) => dispatch(currentActions.setTodo(t));

  const { id, completed, title } = todo;

  return (
    <tr
      data-cy="todo"
      key={id}
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
          className={classNames(
            completed ? 'has-text-success' : 'has-text-danger',
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
          onClick={() => setTodo(todo)}
        >
          <span className="icon">
            <i className={classNames('far', {
              'fa-eye-slash': currentTodo?.id === id,
              'fa-eye': currentTodo?.id !== id,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
