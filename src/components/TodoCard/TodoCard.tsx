import classNames from 'classnames';
import { Todo as TodoType } from '../../types/Todo';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTodo } from '../../features/currentTodo';
import { RootState } from '../../app/store';

type Props = {
  todo: TodoType;
};

export const TodoCard: React.FC<Props> = ({ todo }) => {
  const currentTodo = useSelector(
    (state: RootState) => state.currentTodo?.title,
  );
  const { id, completed, title } = todo;
  const dispatch = useDispatch();

  const hanldeChose = () => {
    dispatch(setCurrentTodo(todo));
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
        <p
          className={classNames(
            { 'has-text-danger': !completed },
            { 'has-text-success': completed },
          )}
        >
          {title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          onClick={hanldeChose}
          data-cy="selectButton"
          className="button"
          type="button"
        >
          <span className="icon">
            <i
              className={classNames(
                'far',
                { 'fa-eye': !currentTodo },
                { 'fa-eye-slash': currentTodo },
              )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
