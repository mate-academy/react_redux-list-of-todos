import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTodo } from '../../features/currentTodo';
import { RootState } from '../../app/store';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, completed, title } = todo;

  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const dispatch = useDispatch();

  return (
    <>
      <tr
        data-cy="todo"
        className={cn({ 'has-background-info-light': currentTodo?.id === id })}
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
            className={cn({
              'has-text-success': completed,
              'has-text-danger': !completed,
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
            onClick={() => dispatch(setCurrentTodo(todo))}
          >
            <span className="icon">
              <i
                className={cn('far', {
                  'fa-eye': currentTodo?.id !== id,
                  'fa-eye-slash': currentTodo?.id === id,
                })}
              />
            </span>
          </button>
        </td>
      </tr>
    </>
  );
};
