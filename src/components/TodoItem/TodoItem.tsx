import classNames from 'classnames';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

type TodoItemState = {
  todo: Todo,
};

export const TodoItem: FC<TodoItemState> = ({ todo }) => {
  const { title, completed, id } = todo;
  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  return (
    <tr
      data-cy="todo"
      className={classNames(
        '',
        { 'has-background-info-light': id === currentTodo?.id },
      )}
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
        <p className={classNames('', {
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
          onClick={() => dispatch(currentTodoActions.setTodo(todo))}
        >
          <span className="icon">
            <i className={classNames(
              'far',
              {
                'fa-eye-slash': currentTodo?.id === id,
                'fa-eye': currentTodo?.id !== id,
              },
            )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
