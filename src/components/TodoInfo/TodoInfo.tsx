import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { Todo } from '../../types/Todo';
import { actions } from '../../features/currentTodo';
import { useAppSelector } from '../../app/hooks';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({
  todo,
}) => {
  const { id, title, completed } = todo;
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  const isSelected = currentTodo?.id === id;

  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light': isSelected,
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
        <p className={cn(
          { 'has-text-success': completed },
          { 'has-text-danger': !completed },
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
          onClick={() => {
            dispatch(actions.setTodo(todo));
          }}
        >
          <span className="icon">
            <i className={cn('far',
              { 'fa-eye-slash': isSelected },
              { 'fa-eye': !isSelected })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
