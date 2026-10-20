/* eslint-disable */
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { setCurrentTodo } from '../../features/currentTodo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useDispatch();
  const { query } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  return (
    <>
      {query && todos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {todos.length > 0 && (
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
            {todos.map(todo => (
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
                    onClick={() => dispatch(setCurrentTodo(todo))}
                  >
                    <span className="icon">
                      <i
                        className={classNames('far', {
                          'fa-eye-slash': currentTodo,
                          'fa-eye': !currentTodo,
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
