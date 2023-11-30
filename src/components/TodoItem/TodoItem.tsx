import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const handleButtonClick = () => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  return (
    <tr
      data-cy="todo"
      className={classNames(
        { 'has-background-info-light': currentTodo?.id === todo.id },
      )}
      key={todo.id}
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
        <p className={
          todo.completed
            ? 'has-text-success'
            : 'has-text-danger'
        }
        >
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => handleButtonClick()}
        >
          <span className="icon">
            <i className={classNames(
              'far', {
                'fa-eye-slash': todo.id === currentTodo?.id,
                'fa-eye': todo.id !== currentTodo?.id,
              },
            )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
