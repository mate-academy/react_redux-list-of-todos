/* eslint-disable max-len */
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList = () => {
  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const selectTodo = (currentTodo: Todo) => dispatch(actions.setTodo(currentTodo));

  const visibleTodos = useAppSelector(({ filter, todos }) => {
    const { status, query } = filter;

    let filtered = [...todos];

    switch (status) {
      case 'completed':
        filtered = filtered.filter((todo) => todo.completed);
        break;
      case 'active':
        filtered = filtered.filter((todo) => !todo.completed);
        break;
      case 'all':
        break;
      default:
        break;
    }

    if (query) {
      filtered = filtered.filter((todo) => todo.title.toLowerCase().includes(query.toLowerCase()));
    }

    return filtered;
  });

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {visibleTodos.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={todo.id === selectedTodo?.id
              ? 'has-background-info-light'
              : ''}
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
                className={todo.completed
                  ? 'has-text-success'
                  : 'has-text-danger'}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                onClick={() => selectTodo(todo)}
                data-cy="selectButton"
                className="button"
                type="button"
              >
                {todo.id === selectedTodo?.id ? (
                  <span className="icon">
                    <i className="far fa-eye-slash" />
                  </span>
                ) : (
                  <span className="icon">
                    <i className="far fa-eye" />
                  </span>
                )}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
