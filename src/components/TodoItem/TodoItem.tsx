/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as todoActions } from '../../features/currentTodo';

interface Props {
  todo: Todo
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
  } = todo;

  const dispatch = useAppDispatch();

  const handlerClick = () => {
    dispatch(todoActions.setTodo(todo));
  };

  const selectedTodo = useAppSelector(state => state.currentTodo);

  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p className={classNames({
          'has-text-danger': !completed,
          'has-text-success': completed,
        })}
        >
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          onClick={handlerClick}
          data-cy="selectButton"
          className="button"
          type="button"
        >
          <span className="icon">
            <i className={classNames('far',
              { 'fa-eye-slash': selectedTodo?.id === todo.id },
              { 'fa-eye': selectedTodo?.id !== todo.id })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
