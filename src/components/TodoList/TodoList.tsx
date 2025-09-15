/* eslint-disable react/jsx-key */
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';
import classNames from 'classnames';

type Props = {
  todos: Todo[] | undefined;
};

export const TodoList = ({ todos }: Props) => {
  const dispatch = useAppDispatch();
  const pickedTodo = useAppSelector(state => state.currentTodo.currentTodo);

  return (
    <>
      {todos?.length === 0 ? (
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
            {todos?.map(todo => {
              return (
                <tr data-cy="todo">
                  <td className="is-vcentered">{todo.id}</td>
                  {!todo.completed ? (
                    <td className="is-vcentered"> </td>
                  ) : (
                    <td className="is-vcentered">
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    </td>
                  )}

                  <td className="is-vcentered is-expanded">
                    <p
                      className={classNames({
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
                      onClick={() => dispatch(currentTodoActions.set(todo))}
                    >
                      <span className="icon">
                        <i
                          className={classNames(
                            'far',
                            todo.id === pickedTodo?.id
                              ? 'fa-eye-slash'
                              : 'fa-eye',
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
