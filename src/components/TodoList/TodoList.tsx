import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { getFilteredTodos } from '../../utils/getFilteredTodos';

export const TodoList = () => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query } = useAppSelector(state => state.filter);
  const { status } = useAppSelector(state => state.filter);

  const visibleTodos = getFilteredTodos(todos, { status, query });

  const handleSelectCurrentTodo = (currTodo: Todo) =>
    dispatch(currentTodoActions.setTodo(currTodo));

  return (
    <>
      {!visibleTodos.length ? (
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
            {visibleTodos.map(todo => {
              const { id, title, completed } = todo;

              return (
                <tr
                  data-cy="todo"
                  className={classNames({
                    'has-background-info-light': currentTodo?.id === id,
                  })}
                  key={id}
                >
                  <td className="is-vcentered">{id}</td>
                  {completed ? (
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
                      className={classNames(
                        completed ? 'has-text-success' : 'has-text-danger',
                      )}
                    >
                      {title}
                    </p>
                  </td>
                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => handleSelectCurrentTodo(todo)}
                    >
                      <span className="icon">
                        <i
                          className={classNames(
                            'far',
                            currentTodo?.id === id ? 'fa-eye-slash' : 'fa-eye',
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
      )}
    </>
  );
};
