import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';

type Props = {
  todo: Todo;
};

export const TableRow: React.FC<Props> = ({ todo }) => {
  const { id, completed, userId, title } = todo;
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const setTodo = (currentTodo: Todo) =>
    dispatch(currentTodoSlice.actions.setTodo(currentTodo));

  return (
    <tr
      data-cy="todo"
      key={id}
      className={classNames({
        'has-background-info-light': id === currentTodo?.id,
      })}
    >
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed || (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p
          className={classNames(
            { 'has-text-danger': completed },
            { 'has-text-success': !completed },
          )}
        >
          {title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button data-cy="selectButton" className="button" type="button">
          <span className="icon">
            <i
              className={classNames(
                'far',
                { 'fa-eye-slash': id === currentTodo?.id },
                { 'fa-eye': id !== currentTodo?.id },
              )}
              onClick={() => setTodo({ id, title, completed, userId })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
