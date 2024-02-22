import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Filters, Todo } from '../../types';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos) || [];
  const currentTodo = useAppSelector(state => state.currentTodo);
  const filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const filterByStatus = (): Todo[] => {
    switch (filter.status) {
      case Filters.ALL:
        return todos;
      case Filters.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case Filters.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const filterByQuery = (filtered: Todo[]): Todo[] => {
    const query = filter.query.toLowerCase().trim();

    return query
      ? filtered.filter(todo => todo.title.toLowerCase().includes(query))
      : filtered;
  };

  const filteredTodos = filterByQuery(filterByStatus());

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th aria-label="icon">
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th aria-label="empty header"> </th>
        </tr>
      </thead>

      <tbody>
        {filteredTodos.map(todo => (
          <tr
            data-cy="todo"
            className={classNames({
              'has-background-info-light': todo.id === currentTodo?.id,
            })}
            key={todo.id}
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
                className={classNames(
                  `has-text-${todo.completed ? 'success' : 'danger'}`,
                )}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                aria-label="Select todo"
                onClick={() => {
                  dispatch(actions.setTodo(todo));
                }}
              >
                <span className="icon">
                  <i
                    className={classNames(
                      'far',
                      `fa-eye${todo.id === currentTodo?.id ? '-slash' : ''}`,
                    )}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
