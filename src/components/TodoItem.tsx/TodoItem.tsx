import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const { id, title, completed } = todo;

  const isSelected = (id === selectedTodo?.id) || false;

  const handleSelectTodoBtn = () => {
    dispatch(actions.setTodo(todo));
  };

  return (
    <tr
      data-cy="todo"
      className={classNames(
        { 'has-background-info-light': isSelected },
      )}
      key={id}
    >
      <td className="is-vcentered">{id}</td>
      {completed
        ? (
          <td className="is-vcentered">
            <span className="icon" data-cy="iconCompleted">
              <i className="fas fa-check" />
            </span>
          </td>
        )
        : <td className="is-vcentered" />}

      <td className="is-vcentered is-expanded">
        <p className={classNames(
          { 'has-text-success': completed },
          { 'has-text-danger': !completed },
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
          onClick={handleSelectTodoBtn}
        >
          <span className="icon">
            <i className={classNames(
              'far',
              { 'fa-eye': !isSelected },
              { 'fa-eye-slash': isSelected },
            )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
