import { useDispatch } from 'react-redux';
import { Todo } from '../../../types/Todo';
import { currentTodoSlice } from '../../../features/currentTodo';

type Props = {
  todo: Todo;
  selectedTodo: Todo | null;
};

export const TodoItem: React.FC<Props> = ({ todo, selectedTodo }) => {
  const { id, title, completed } = todo;
  const isSelected = selectedTodo?.id === todo.id;
  const dispatch = useDispatch();

  const handleSelect = (todoItem: Todo) => {
    dispatch(currentTodoSlice.actions.selectTodo(todoItem));
  };

  return (
    <tr
      data-cy="todo"
      key={title}
      className={`${isSelected ? 'has-background-info-light' : ''}`}
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
        <p className={`${completed ? 'has-text-success' : 'has-text-danger'}`}>
          {title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => handleSelect(todo)}
        >
          <span className="icon">
            {isSelected ? (
              <i className="far fa-eye-slash" />
            ) : (
              <i className="far fa-eye" />
            )}
          </span>
        </button>
      </td>
    </tr>
  );
};
