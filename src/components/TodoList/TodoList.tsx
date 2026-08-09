import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import classNames from 'classnames';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const sortValue = useSelector((value: RootState) => value.filter.status);
  const querryValue = useSelector((value: RootState) => value.filter.query);
  const currentId = useSelector((value: RootState) => value.currentTodo?.id);

  const dispatch = useDispatch();

  const todos = useSelector((state: RootState) => state.todos)
    .filter(todo => {
      if (sortValue === 'all') {
        return todo;
      }

      if (sortValue === 'active') {
        return !todo.completed;
      }

      return todo.completed;
    })
    .filter(filteredTodo =>
      filteredTodo.title.toLowerCase().includes(querryValue.toLowerCase()),
    );

  return (
    <>
      {todos.length === 0 && (
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
          {todos.map(todo => {
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
                    className={classNames(
                      `${todo.completed ? 'has-text-success' : 'has-text-danger'}`,
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
                    onClick={() => dispatch(setCurrentTodo(todo))}
                  >
                    <span className="icon">
                      <i
                        className={classNames(
                          `far fa-eye${todo.id === currentId ? '-slash' : ''}`,
                        )}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
