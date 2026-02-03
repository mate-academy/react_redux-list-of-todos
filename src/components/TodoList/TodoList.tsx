import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { setCurrentTodo } from '../../features/currentTodo';
import { Status } from '../../types/Status';

function getFilteredTodos(todos: Todo[], query: string, status: Status) {
  let filteredTodos = [...todos];

  if (status) {
    switch (status) {
      case 'active':
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      case 'completed':
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;
      default:
        break;
    }
  }

  if (query) {
    filteredTodos = filteredTodos.filter(todo => {
      const normalizedQuery = query.trim().toLowerCase();
      const normalizedTodo = todo.title.trim().toLowerCase();

      return normalizedTodo.includes(normalizedQuery);
    });
  }

  return filteredTodos;
}

export const TodoList = () => {
  const dispatch = useDispatch();
  const { todos } = useAppSelector(state => state.todos);
  const { currentTodo } = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);

  const handleSelectTodo = (todo: Todo) => {
    dispatch(setCurrentTodo(todo));
  };

  const filteredTodos = getFilteredTodos(todos, query, status);

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
            className="has-background-info-light"
            key={todo.id}
          >
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
              <p
                className={cn(
                  todo.completed ? 'has-text-success' : 'has-text-danger',
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
                onClick={() => handleSelectTodo(todo)}
              >
                <span className="icon">
                  <i
                    className={cn(
                      'far',
                      currentTodo?.id === todo.id ? 'fa-eye-slash' : 'fa-eye',
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
