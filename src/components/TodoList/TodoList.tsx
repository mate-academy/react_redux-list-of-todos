/* eslint-disable */
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { setCurrentTodo } from '../../features/currentTodo';
import { useMemo } from 'react';
import { filterTodos } from '../../utils/filterTodos';

export const TodoList = () => {
  const filter = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const filteredTodos = useMemo(
    () => filterTodos(todos, filter),
    [todos, filter],
  );
  const dispatch = useDispatch();

  const handleCurrentTodo = (todo: Todo) => {
    dispatch(setCurrentTodo(todo));
  };

  return (
    <>
      {filteredTodos.length > 0 ? (
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
              <tr
                data-cy="todo"
                key={todo.id}
                className={classNames({
                  'has-background-info-light': todo === currentTodo,
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
                    className={
                      todo.completed ? 'has-text-success' : 'has-text-danger'
                    }
                  >
                    {/* quis ut nam facilis et officia qui */}
                    {todo.title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => handleCurrentTodo(todo)}
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
      ) : (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
    </>
  );
};
