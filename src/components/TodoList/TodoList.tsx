import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoList = () => {
  const dispatch = useAppDispatch();
  const { filter, currentTodo, todos } = useAppSelector(state => state);

  //#region filterTodos
  const filteredTodos = todos
    .filter(todo => {
      if (filter.status === 'completed') {
        return todo.completed;
      }

      if (filter.status === 'active') {
        return !todo.completed;
      }

      return true;
    })
    .filter(todo =>
      todo.title.toLowerCase().includes(filter.query.toLowerCase()),
    );
  //#endregion

  return (
    <>
      {!!filteredTodos.length ? (
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
              const { id, title, completed } = todo;

              return (
                <tr
                  data-cy="todo"
                  key={id}
                  className={classNames({
                    'has-background-info-light': currentTodo?.id === id,
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
                      className={classNames({
                        'has-text-danger': !completed,
                        'has-text-success': completed,
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
                      onClick={() =>
                        dispatch(currentTodoSlice.actions.set(todo))
                      }
                    >
                      <span className="icon">
                        <i
                          className={classNames('far', {
                            'fa-eye': currentTodo?.id !== id,
                            'fa-eye-slash': currentTodo?.id === id,
                          })}
                        />
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="notification is-warning">
          There are no todos with such filter criteria
        </p>
      )}
    </>
  );
};
