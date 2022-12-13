import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoItem: React.FC<Todo> = (props) => {
  const {
    completed,
    title,
    id,
  } = props;
  const dispatch = useDispatch();

  const handleShowDetails = () => {
    dispatch(currentTodoActions.setTodo({ ...props }));
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
          onClick={() => {
            handleShowDetails();
          }}
        >
          <span className="icon">
            <i className="far fa-eye" />
          </span>
        </button>
      </td>
    </tr>
  );
};
