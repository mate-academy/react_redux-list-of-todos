import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { setCurrentTodo } from '../../features/currentTodo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const isSelected = currentTodo?.id === todo.id;

  return (
    <tr
      data-cy="todo"
      className={isSelected ? 'has-background-info-light' : ''}
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
        <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>
          {todo.title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => dispatch(setCurrentTodo(todo))}
        >
          <span className="icon">
            <i className={isSelected ? 'far fa-eye-slash' : 'far fa-eye'} />
          </span>
        </button>
      </td>
    </tr>
  );
};
