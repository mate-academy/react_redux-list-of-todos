import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { selectTodoSuccess } from '../../features/currentTodo';

type Props = {
  todo: Todo;
};

export const TodoCard: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedTodo = useSelector(
    (state: RootState) => state.currentTodo.todo,
  );
  const isModalActive = useSelector(
    (state: RootState) => state.currentTodo.isModalActive,
  );

  return (
    <tr
      data-cy="todo"
      className={classNames(
        selectedTodo?.id === todo?.id && isModalActive
          ? 'has-background-info-light'
          : '',
      )}
    >
      <td className="is-vcentered">{todo?.id}</td>
      <td className="is-vcentered">
        {todo?.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p
          className={classNames(
            todo?.completed ? 'has-text-success' : 'has-text-danger',
          )}
        >
          {todo?.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => {
            dispatch(selectTodoSuccess(todo));
          }}
        >
          <span className="icon">
            <i
              className={classNames(
                selectedTodo?.id === todo?.id && isModalActive
                  ? 'far fa-eye-slash'
                  : 'far fa-eye',
              )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
