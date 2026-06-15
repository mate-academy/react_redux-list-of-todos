/* eslint-disable */
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useDispatch, useSelector } from 'react-redux';
import { actions as actionsCurrentTodo } from '../../features/currentTodo';
import { RootState } from '../../app/store';

export const TodoList = ({ filteredTodos }: { filteredTodos: Todo[] }) => {
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const dispatch = useDispatch();


  return (
    <>
      {filteredTodos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
      {filteredTodos.length !== 0 && (
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
              return (
                <tr
                  key={todo.id}
                  data-cy="todo"
                  className={classNames({
                    'has-background-info-light':
                      currentTodo && currentTodo.id === todo.id,
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
                      onClick={() => dispatch(actionsCurrentTodo.setTodo(todo))}
                    >
                      <span className="icon">
                        <i
                          className={classNames('far', {
                            'fa-eye': !currentTodo || currentTodo.id !== todo.id,
                            'fa-eye-slash': currentTodo && currentTodo.id === todo.id,
                          })}
                        />
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}

            {/* <tr data-cy="todo" className="has-background-info-light">
              <td className="is-vcentered">3</td>
              <td className="is-vcentered"> </td>

              <td className="is-vcentered is-expanded">
                <p className="has-text-danger">fugiat veniam minus</p>
              </td>

              <td className="has-text-right is-vcentered">
                <button data-cy="selectButton" className="button" type="button">
                  <span className="icon">
                    <i className="far fa-eye-slash" />
                  </span>
                </button>
              </td>
            </tr> */}
          </tbody>
        </table>
      )}
    </>
  );
};
