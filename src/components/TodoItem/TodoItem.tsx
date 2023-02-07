import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';

type Props = {
  todo: Todo
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const isCurrent = currentTodo?.id === todo.id;

  const handleButtonClick = () => {
    if (isCurrent) {
      dispatch(currentTodoActions.removeTodo());

      return;
    }

    dispatch(currentTodoActions.setTodo(todo));
  };

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': isCurrent,
      })}
    >
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p
          className={classNames({
            'has-text-danger': !todo.completed,
            'has-text-success': todo.completed,
          })}
        >
          {todo.title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={handleButtonClick}
        >
          <span className="icon">
            <i className={classNames('far',
              {
                'fa-eye': !isCurrent,
                'fa-eye-slash': isCurrent,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
