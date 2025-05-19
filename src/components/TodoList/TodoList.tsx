import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';
import { currentTodoSlice } from '../../features/currentTodo';

type TodoListProps = {
  isLoading: boolean;
};

export const TodoList = ({ isLoading }: TodoListProps) => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();
  const { status, query } = useAppSelector(state => state.filter);

  const filterState = (currentStatus: Status) => {
    switch (currentStatus) {
      case Status.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case Status.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const filterTodos = () => {
    return filterState(status as Status).filter(todo => {
      return todo.title
        .toLowerCase()
        .trim()
        .includes(query.toLowerCase().trim());
    });
  };

  return (
    <>
      {filterTodos().length === 0 && !isLoading ? (
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
            {filterTodos().map(todo => {
              return (
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
                      className={`${todo.completed ? 'has-text-success' : 'has-text-danger'}`}
                    >
                      {todo.title}
                    </p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() =>
                        dispatch(currentTodoSlice.actions.setTodo(todo))
                      }
                    >
                      <span className="icon">
                        <i
                          className={`${todo.id === currentTodo?.id ? 'far fa-eye-slash' : 'far fa-eye'}`}
                        />
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
