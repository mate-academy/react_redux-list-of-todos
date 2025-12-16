import { useAppSelector, useDispatchSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  loading: boolean;
}

export const TodoList: React.FC<TodoListProps> = ({ loading }) => {
  const todos = useAppSelector(state => state.todos);
  const todoFromState = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatchSelector();
  const setActiveTodo = (todo: Todo) =>
    dispatch(currentTodoSlice.actions.set(todo));
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  let filteredTodos = [...todos];

  if (status) {
    filteredTodos = filteredTodos.filter(todo => {
      switch (status) {
        case 'active':
          return todo.completed === false;
        case 'completed':
          return todo.completed === true;
        default:
          return true;
      }
    });
  }

  if (query) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return (
    <>
      {filteredTodos.length < 1 && !loading ? (
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
              <tr
                data-cy="todo"
                className={
                  !!todoFromState && todo.id === todoFromState.id
                    ? 'has-background-info-light'
                    : ''
                }
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
                    className={
                      todo.completed ? 'has-text-success' : 'has-text-danger'
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
                    onClick={() => setActiveTodo(todo)}
                  >
                    <span className="icon">
                      <i
                        className={
                          !!todoFromState && todo.id === todoFromState.id
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
