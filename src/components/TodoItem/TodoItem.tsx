import ClassNames from 'classnames';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo
}

export const TodoItem: FC<Props> = ({ todo }) => {
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
      className={ClassNames({ 'has-background-info-light': isCurrentTodo })}
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
          onClick={() => dispatch(actions.setTodo(todo))}
        >
          <span className="icon">
            <i
              className={ClassNames('far',
                isCurrentTodo ? 'fa-eye-slash' : 'fa-eye')}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
