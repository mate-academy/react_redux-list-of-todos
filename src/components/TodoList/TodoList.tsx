import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions } from '../../features/currentTodo';

export const TodoList = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const filterQuery = useAppSelector(state => state.filter.query);
  const filterStatus = useAppSelector(state => state.filter.status);

  const cahngedSelectTodo = (value: Todo) => {
    dispatch(actions.setTodo(value));
  };

  const filterTodo = (queryTodo: string, optionQuery: string) => {
    switch (optionQuery) {
      case 'active':
        return todos.filter(todo => !todo.completed
          && todo.title.toLowerCase().includes(queryTodo.toLowerCase()));

      case 'completed':
        return todos.filter(todo => todo.completed
          && todo.title.toLowerCase().includes(queryTodo.toLowerCase()));

      default:
        if (filterQuery.length > 0) {
          return todos.filter(
            todo => todo.title.toLowerCase().includes(queryTodo.toLowerCase()),
          );
        }

        return todos;
    }
  };

  const filteredTodos = filterTodo(filterQuery, filterStatus);

  return (
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
            className=""
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
              <p className={todo.completed
                ? 'has-text-success'
                : 'has-text-danger'}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => cahngedSelectTodo(todo)}
              >
                <span className="icon">
                  <i className={currentTodo === todo
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
  );
};
