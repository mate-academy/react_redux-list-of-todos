import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

interface Props {
  todo: Todo
}

export const TodoListItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();

  const isCurrentTodo = useAppSelector(state => (
    todo.id === state.currentTodo?.id
  ));

  return (
    <tr
      data-cy="todo"
      className={cn({ 'has-background-info-light': isCurrentTodo })}
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
        <p className={todo.completed
          ? 'has-text-success'
          : 'has-text-danger'}
        >
          {todo.title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => dispatch(currentTodoActions.setTodo(todo))}
        >
          <span className="icon">
            <i
              className={cn('far',
                isCurrentTodo
                  ? 'fa-eye-slash'
                  : 'fa-eye')}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
