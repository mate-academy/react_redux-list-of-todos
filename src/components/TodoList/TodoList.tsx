import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';

/* eslint-disable */
export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos.todos);
  const filters = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const set = (todo: Todo) =>
    dispatch({ type: 'currentTodo/SET', payload: todo });

  const normalizedQuery = filters.query.toLowerCase();
  const filteredTodos = todos.filter(todo => {
    const filter = todo.title.toLowerCase().includes(normalizedQuery);

    if (filters.status === 'all') {
      return filter;
    }

    if (filters.status === 'active') {
      return !todo.completed && filter;
    }

    if (filters.status === 'completed') {
      return todo.completed && filter;
    }

    return todo.title.toLowerCase().includes(normalizedQuery);
  });

  return (
    <>
      {filteredTodos.length === 0 ? (
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
            {filteredTodos.map(todo => (
              <tr data-cy="todo" key={todo.id}>
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
                    className={
                      !todo.completed ? 'has-text-danger' : 'has-text-success'
                    }
                  >
                    {todo.title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => set(todo)}
                  >
                    <span className="icon">
                      <i
                        className={
                          todo.id === currentTodo?.id
                            ? 'far fa-eye-slash'
                            : 'far fa-eye'
                        }
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
