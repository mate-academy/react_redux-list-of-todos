import cn from 'classnames';
import { FC, memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo
}

export const TodoListItem: FC<Props> = memo(({ todo }) => {
  const {
    id,
    title,
    completed,
  } = todo;

  const dispatch = useAppDispatch();

  const isCurrentTodo = useAppSelector(state => (
    state.currentTodo?.id === id
  ));

  return (
    <tr
      data-cy="todo"
      className={cn({ 'has-background-info-light': isCurrentTodo })}
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
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => dispatch(currentTodoActions.setTodo(todo))}
        >
          <span className="icon">
            <i
              className={cn('far', isCurrentTodo ? 'fa-eye-slash' : 'fa-eye')}
            />
          </span>
        </button>
      </td>
    </tr>
  );
});
