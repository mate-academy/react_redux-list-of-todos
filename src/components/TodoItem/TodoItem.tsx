import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const handleSetCurrent = (todoFromTable: Todo) => {
    dispatch(currentTodoSlice.actions.setCurrentTodo(todoFromTable));
  };

  return (
    <tr data-cy="todo">
      <td className="is-vcentered">{id}</td>
      {!completed ? (
        <td className="is-vcentered" />
      ) : (
        <td className="is-vcentered">
          <span data-cy="iconCompleted" className="icon">
            <i className="fas fa-check" />
          </span>
        </td>
      )}
      <td className="is-vcentered is-expanded">
        <p
          className={cn(
            { 'has-text-danger': !completed },
            { 'has-text-success': completed },
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
          onClick={() => handleSetCurrent(todo)}
        >
          <span className="icon">
            <i
              className={cn(
                'far',
                { 'fa-eye-slash': id === currentTodo?.id },
                { 'fa-eye': id !== currentTodo?.id },
              )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
