import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectTodo: (todo: number | null) => void,
  selectedTodoId: number | null,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectTodo,
  selectedTodoId,
}) => (
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
      {todos.map(({
        id, title, completed,
      }) => (
        <tr
          key={id}
          data-cy="todo"
          className={classNames(
            { 'has-background-info-light': selectedTodoId === id },
          )}
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
            <p className={classNames(
              {
                'has-text-success': completed,
                'has-text-danger': !completed,
              },
            )}
            >
              {title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            {selectedTodoId === id ? (
              <button
                data-cy="selectButton"
                className="button"
                type="button"
              >
                <span className="icon">
                  <i className="far fa-eye-slash" />
                </span>
              </button>
            ) : (
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => selectTodo(id)}
              >
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
