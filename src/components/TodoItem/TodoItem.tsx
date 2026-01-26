import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const isSelected = currentTodo?.id === todo.id;
  const check = todo.completed ? (
    <span className="icon" data-cy="iconCompleted">
      <i className="fas fa-check" />
    </span>
  ) : null;

  return (
    <tr
      data-cy="todo"
      className={classNames({ 'has-background-info-light': isSelected })}
    >
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">{check}</td>

      <td className="is-vcentered is-expanded">
        <p
          className={classNames(
            todo.completed ? 'has-text-success' : 'has-text-danger',
          )}
        >
          {todo.title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          onClick={() => dispatch(currentTodoSlice.actions.selectTodo(todo))}
          data-cy="selectButton"
          className="button"
          type="button"
        >
          <span className="icon">
            <i
              className={classNames(
                'far',
                isSelected ? 'fa-eye-slash' : 'far fa-eye',
              )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
