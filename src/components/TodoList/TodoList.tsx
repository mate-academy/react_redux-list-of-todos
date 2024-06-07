/* eslint-disable */
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Filter } from '../../types/Filter';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);

  const setCurrentTodo  = (value: Todo) =>
    dispatch(currentTodoActions.setTodo(value));

  const visibleTodos = todos.filter(todo => {
    const filteredByQuery = todo.title.toLowerCase().includes(filter.query.toLowerCase().trim());
    const filteredByStatus = filter.status === Filter.All ||
      filter.status === Filter.Completed && todo.completed ||
      filter.status === Filter.Active && !todo.completed

    return filteredByQuery && filteredByStatus;
  })

  return (
    <>
      {!visibleTodos.length && (
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
          <tr data-cy="todo" key={todo.id} className="">
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed}
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={classNames(
                  todo.completed === false
                    ? 'has-text-danger'
                    : 'has-text-success',
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
                onClick={() => setCurrentTodo(todo)}
              >
                <span className="icon">
                  {currentTodo === todo ? (
                    <i className="far fa-eye-slash" />
                  ) : (
                    <i className="far fa-eye" />
                  )}
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
