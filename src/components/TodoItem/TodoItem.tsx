import { useDispatch } from 'react-redux';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { title, completed, id } = todo;
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  const isIdEqualToCurrentTodo = id === currentTodo?.id;

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': isIdEqualToCurrentTodo,
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
        <p className={completed ? 'has-text-success' : 'has-text-danger'}>
          {title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          onClick={() => dispatch(currentTodoActions.setTodo(todo))}
          data-cy="selectButton"
          className="button"
          type="button"
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye': !isIdEqualToCurrentTodo,
                'fa-eye-slash': isIdEqualToCurrentTodo,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
