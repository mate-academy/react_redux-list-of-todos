import cn from 'classnames';
import { actions } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const { todos, currentTodo, filter } = useAppSelector(state => state);
  const { query, status } = filter;
  const { setTodo, removeTodo } = actions;
  const dispatch = useAppDispatch();

  const filteredTodos = todos.filter(({ title, completed }) => {
    const hasQuery = RegExp(query.trim(), 'i').test(title);
    let hasStatus = true;

    if (status === 'active') {
      hasStatus = !completed;
    }

    if (status === 'completed') {
      hasStatus = completed;
    }

    return hasQuery && hasStatus;
  });

  const toggleCurrentTodo = (todo: Todo) => () => {
    if (currentTodo?.id === todo.id) {
      dispatch(removeTodo());
    } else {
      dispatch(setTodo(todo));
    }
  };

  return (
    <>
      {filteredTodos.length
        ? (
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
                      className={cn({
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
                      onClick={toggleCurrentTodo(todo)}
                    >
                      <span className="icon">
                        <i
                          className={cn('far', {
                            'fa-eye': !todo.completed,
                            'fa-eye-slash': todo.completed,
                          })}
                        />
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
        : (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        )}
    </>
  );
};
