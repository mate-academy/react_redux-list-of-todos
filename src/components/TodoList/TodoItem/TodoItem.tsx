import { Todo } from '../../../types/Todo';
import { currTodoActions } from '../../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector((state) => state.currentTodo);

  const { id, completed, title } = todo;

  const handleButtonClick = () => {
    dispatch(currTodoActions.setCurrentTodo(todo));
  };

  return (
    <tr data-cy="todo">
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
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={handleButtonClick}
        >
          <span className="icon">
            <i
              className={
                currentTodo?.id === id ? 'far fa-eye-slash' : 'far fa-eye'
              }
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
