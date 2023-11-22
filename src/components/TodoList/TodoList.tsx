import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { actions } from '../../features/currentTodo';
import { Status } from '../../types/Status';
import { useAppSelector } from '../../app/hooks';

export const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);

  const getVisibleTodos = () => {
    let preparedTodos = [...todos];

    if (query.trim()) {
      preparedTodos = preparedTodos.filter(
        todo => todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    switch (status) {
      case Status.active:
        return preparedTodos.filter(todo => !todo.completed);

      case Status.completed:
        return preparedTodos.filter(todo => todo.completed);

      default:
        return preparedTodos;
    }
  };

  const visibleTodos = getVisibleTodos();

  return (
    <>
      {!visibleTodos.length ? (
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
            {visibleTodos.map(todo => (
              <tr data-cy="todo" className="" key={todo.id}>
                <td className="is-vcentered">{todo.id}</td>
                {todo.completed ? (
                  <td className="is-vcentered">
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  </td>
                ) : (
                  <td className="is-vcentered" />
                )}
                <td className="is-vcentered is-expanded">
                  <p className={classNames({
                    'has-text-success': todo.completed,
                    'has-text-danger': !todo.completed,
                  })}
                  >
                    {todo.title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => dispatch(actions.setTodo(todo))}
                  >
                    <span className="icon">
                      <i className={todo === selectedTodo
                        ? 'far fa-eye-slash'
                        : 'far fa-eye'}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
