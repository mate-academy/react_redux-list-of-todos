import { useDispatch, useSelector } from 'react-redux';
import { Todo } from '../../types/Todo';
import { AppDispatch, RootState } from '../../app/store';
import { setTodo } from '../../features/currentTodo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch<AppDispatch>();

  const selectedTodo = useSelector(
    (state: RootState) => state.currentTodo.todo,
  );

  const isSelected = selectedTodo?.id === todo.id;

  const handleTodo = () => {
    dispatch(setTodo(todo));
  };

  return (
    <tr data-cy="todo">
      <td className="is-vcentered">{todo.id}</td>

      <td className="is-vcentered">
        {todo.completed ? (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        ) : (
          ''
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
          onClick={() => handleTodo()}
        >
          <span className="icon">
            <i className={`far ${isSelected ? 'fa-eye-slash' : 'fa-eye'}`} />
          </span>
        </button>
      </td>
    </tr>
  );
};
