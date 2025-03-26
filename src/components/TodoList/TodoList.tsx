/* eslint-disable */
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { RootState } from '../../app/store';
import { setTodo } from '../../features/currentTodo';

export const TodoList = () => {
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const todos = useAppSelector((state: RootState) => state.todos.todos);
  const currentTodo = useAppSelector(state => state.currentTodo.currentTodo);
  const dispatch = useAppDispatch();
  let noTodos = false;

  const filteredTodos = todos
    .filter(todo => {
      switch (status) {
        case 'all':
          return todo;
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return false;
      }
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  if (filteredTodos.length === 0) {
    noTodos = true;
  }

  return (
    <>
      {noTodos ? (
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
            {filteredTodos.map(todo => {
              const { title, id, completed } = todo;

              return (
                <tr
                  data-cy="todo"
                  key={id}
                  className={classNames({
                    "has-background-info-light": currentTodo?.id === id,
                  })}
                >
                  <td className="is-vcentered">{id}</td>
                  <td className="is-vcentered">
                    {completed && (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    )}
                  </td>

                  <td className="is-vcentered is-expanded">
                    <p
                      className={classNames('has-text-success', {
                        'has-text-danger': !completed,
                      })}
                    >
                      {title}
                    </p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => dispatch(setTodo(todo))}
                    >
                      <span className="icon">
                        <i className={classNames("far", {
                          'fa-eye': currentTodo?.id !== id,
                          'fa-eye-slash': currentTodo?.id === id
                        })} />
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
