/* eslint-disable */
import { setCurrentTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todoList = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status} = useAppSelector(state => state.filter);

  const handleSelectedTodo = (todo: Todo) => {
    dispatch(setCurrentTodo(todo));
  };

  const filteredTodos = (
    todos: Todo[],
    { query, status }: { query: string; status: Status }
  ): Todo[] => {
    return todos
      .filter(todo => {
        if (status === 'completed') return todo.completed;
        if (status === 'active') return !todo.completed;
        return true;
      })
      .filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase())
      );
  };

  let preparedTodo;

  if (query || status !== 'all') {
    preparedTodo = filteredTodos(todoList, { query, status });
  } else {
    preparedTodo = [...todoList];
  }

  return (
    <>
      {preparedTodo.length === 0 && query ? (
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
            {preparedTodo.map(todo => (
              <tr data-cy="todo" key={todo.id}>
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check"></i>
                  </span>
                )}
              </td>

              <td className="is-vcentered is-expanded">
                <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => handleSelectedTodo(todo)}
                    >
                      <span className="icon">
                        <i
                          className={`far ${currentTodo ? 'fa-eye-slash' : 'fa-eye'}`}
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
