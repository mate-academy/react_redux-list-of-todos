import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { RootState } from '../../app/store';

type Props = {
  todo: Todo,
};

export const TodoInfo = ({ todo }: Props) => {
  const {
    id,
    title,
    completed,
  } = todo;

  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector((state: RootState) => state.currentTodo);

  const setTodo = () => dispatch(currentTodoActions.setTodo(todo));

  return (
    <tr
      data-cy="todo"
      key={id}
      className={cn({
        'has-background-info-light': currentTodo?.id === id,
      })}
    >
      <td className="is-vcentered">{id}</td>
      {completed ? (
        <td className="is-vcentered">
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        </td>
      ) : (
        <td className="is-vcentered" />
      )}
      <td className="is-vcentered is-expanded">
        <p className={cn({
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
          onClick={() => setTodo()}
        >
          <span className="icon">
            <i className={cn('far', {
              'fa-eye': currentTodo?.id !== id,
              'fa-eye-slash': currentTodo?.id === id,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
