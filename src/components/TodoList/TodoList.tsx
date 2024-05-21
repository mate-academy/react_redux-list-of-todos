import { useAppDispatch, useAppSelector } from '../../app/hooks';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Status } from '../../types/Status';

type Props = {
  isLoading: boolean;
};

export const TodoList: React.FC<Props> = ({ isLoading }) => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const prepearedTodos = todos
    .filter(todo =>
      todo.title.toLowerCase().includes(filter.query.toLowerCase().trim()),
    )
    .filter(todo => {
      if (filter.status === Status.Active) {
        return !todo.completed;
      }

      if (filter.status === Status.Completed) {
        return todo.completed;
      }

      return todo;
    });

  const handleSelectTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  return (
    <>
      {!prepearedTodos || !!!prepearedTodos.length ? (
        !isLoading && (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        )
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
            {prepearedTodos.map(todo => (
              <tr
                data-cy="todo"
                key={todo.id}
                className={classNames({
                  'has-background-info-light': todo === selectedTodo,
                })}
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
                    className={classNames({
                      'has-text-danger': !todo.completed,
                      'has-text-success': todo.completed,
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
                    onClick={() => handleSelectTodo(todo)}
                  >
                    <span className="icon">
                      <i
                        className={classNames('far', {
                          'fa-eye-slash': todo === selectedTodo,
                          'fa-eye': todo !== selectedTodo,
                        })}
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
