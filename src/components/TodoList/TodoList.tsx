/* eslint-disable */
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodo';
// import { selectFilteredTodos } from '../../features/todos';

export const TodoList: React.FC = () => {
  const { error } = useAppSelector(state => state.todos);
  // const todos = selectFilteredTodos(useAppSelector(state => state));
  const dispatch = useAppDispatch();
  const { status, query } = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  let visibleTodos = todos;

  if (status !== 'all') {
    visibleTodos = visibleTodos.filter(todo => {
      if (status === 'active') {
        return !todo.completed;
      } else {
        return todo.completed;
      }
    });
  }

  if (query) {
    visibleTodos = visibleTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return (
    <>
      {error && <p>{error}</p>}
      {(!error && visibleTodos.length === 0) && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

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
                  onClick={() => {
                    dispatch(setCurrentTodo(todo));
                  }}
                >
                  <span className="icon">
                    <i
                      className={
                        selectedTodo && selectedTodo.id === todo.id
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
    </>
  );
};
