/* eslint-disable */
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodoId: number | null;
  onSelect: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  onSelect,
}) => {
  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => {
          const isSelected = selectedTodoId === todo.id;

          return (
            <tr data-cy="todo" key={todo.id}>
              <td>{todo.id}</td>

              <td className="todo-title">{todo.title}</td>

              <td className="todo-status">
                {todo.completed && (
                  <span
                    data-cy="iconCompleted"
                    className="icon has-text-success"
                  >
                    ✔
                  </span>
                )}
              </td>

              <td className="todo-actions">
                {!isSelected && (
                  <button
                    data-cy="selectButton"
                    className="button"
                    onClick={() => onSelect(todo)}
                  >
                    <span className="icon">
                      <i className="fas fa-eye" />
                    </span>
                  </button>
                )}

                {isSelected && (
                  <button data-cy="selectedButton" className="button is-link">
                    <span className="icon">
                      <i className="fas fa-eye-slash" />
                    </span>
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
