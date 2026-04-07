import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onSelect: (todo: Todo) => void;
  currentTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({ todos, onSelect, currentTodo }) => {
  return todos.length === 0 ? (
    <p className="notification is-warning">
      There are no todos matching current filter criteria
    </p>
  ) : (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>

          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>

          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => {
          const { completed, id, title } = todo;
          const isSelectedTodo = id === currentTodo?.id;
          const iconClass = isSelectedTodo ? 'far fa-eye-slash' : 'far fa-eye';

          return (
            <tr
              key={id}
              data-cy="todo"
              className={isSelectedTodo ? 'has-background-info-light' : ''}
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
                <p className={`has-text-${completed ? 'success' : 'danger'}`}>
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onSelect(todo)}
                >
                  <span className="icon">
                    <i className={iconClass} />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
