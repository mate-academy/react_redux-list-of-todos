import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currTodoActions } from '../../features/currentTodo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;

  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const isSelected = currentTodo?.id === todo?.id;

  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light': isSelected,
      })}
    >
      <td className="is-vcentered">
        {id}
      </td>
      {
        completed
          ? (
            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            </td>
          )
          : (
            <td className="is-vcentered" />
          )
      }
      <td className="is-vcentered is-expanded">
        <p
          className={cn({
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
          onClick={() => dispatch(currTodoActions.setTodo(todo))}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye': !isSelected,
                'fa-eye-slash': isSelected,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
