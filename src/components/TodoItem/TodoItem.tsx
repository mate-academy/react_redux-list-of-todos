import { FC } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TotoActions } from '../../features/currentTodo';

type Props = {
  todoItem: Todo
};

export const TodoItem: FC<Props> = ({ todoItem }) => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const setCurrentTodo = (todo: Todo) => dispatch(TotoActions.setTodo(todo));

  const {
    id,
    completed,
    title,
  } = todoItem;

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': currentTodo?.id === id,
      })}
    >
      <td className="is-vcentered">{id}</td>

      {completed ? (
        <td className="is-vcentered">
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        </td>
      ) : (
        <td className="is-vcentered" />
      )}
      <td className="is-vcentered is-expanded">
        <p className={classNames({
          'has-text-success': completed,
          'has-text-danger': !completed,
        })}
        >
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          name="selectButton"
          onClick={() => setCurrentTodo(todo)}
          type="button"
        >
          <span className="icon">
            <i className={classNames('far', {
              'fa-eye-slash': currentTodo?.id === id,
              'fa-eye': currentTodo?.id !== id,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
