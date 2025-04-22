import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useDispatch } from 'react-redux';
import { actions as currentTodoActions } from '../../features/currentTodo';

type Props = {
  todo: Todo;
  isSelected: boolean;
};

export const TodoItem: React.FC<Props> = ({ todo, isSelected }) => {
  const dispatch = useDispatch();

  return (
    <tr
      data-cy="todo"
      className={classNames({ 'has-background-info-light': isSelected })}
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
        <p
          className={`${todo.completed ? 'has-text-success' : 'has-text-danger'}`}
        >
          {todo.title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => dispatch(currentTodoActions.setCurrentTodo(todo))}
        >
          <span className="icon">
            <i className={`far ${isSelected ? 'fa-eye-slash' : 'fa-eye'}`} />
          </span>
        </button>
      </td>
    </tr>
  );
};
