import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  setPickedTodo: (pickedTodo: Todo) => void;
  selectedTodo: Todo;
}

export const TodoFC: React.FC<Props> = ({
  todo, setPickedTodo, selectedTodo,
}) => {
  const {
    id,
    completed,
    title,
  } = todo;

  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{id}</td>
      {completed ? (
        <td className="is-vcentered">
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        </td>
      ) : (
        <td className="is-vcentered" />
      )}
      <td className="is-vcentered is-expanded">
        <p className={`has-text-${completed ? 'success' : 'danger'}`}>{title}</p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => setPickedTodo(todo)}
        >
          <span className="icon">
            {
              selectedTodo?.id === id
                ? <i className="far fa-eye-slash" />
                : <i className="far fa-eye" />
            }
          </span>
        </button>
      </td>
    </tr>
  );
};
