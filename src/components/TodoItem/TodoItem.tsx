import classNames from 'classnames';
import {
  useAppDispatch,
  useAppSelector,
} from '../../app/hooks';
import { actions as todoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();

  const currentTodo = useAppSelector(state => state.currentTodo);

  const handleSelectTodo = (item: Todo) => {
    dispatch(todoActions.setTodo(item));
  };

  return (
    <tr
      className={classNames(
        currentTodo?.id === todo.id
          ? 'has-background-info-light'
          : '',
      )}
      data-cy="todo"
    >
      <td className="is-vcentered">
        {todo.id}
      </td>

      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p
          className={classNames(
            !todo.completed
              ? 'has-text-danger'
              : 'has-text-success',
          )}
        >
          {todo.title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => handleSelectTodo(todo)}
        >
          <span className="icon">
            {currentTodo?.id === todo.id
              ? <i className="far fa-eye-slash" />
              : <i className="far fa-eye" />}
          </span>
        </button>
      </td>
    </tr>
  );
};
