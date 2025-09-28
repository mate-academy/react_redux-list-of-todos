/* eslint-disable */
import React, { useMemo} from 'react';
import classNames from 'classnames';
import { Status } from '../../types/Status';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const filteredTodos = useMemo(() => {
    return todos
      .filter(todo => {
        return filter.status === Status.ALL
          ? true
          : filter.status === Status.COMPLETED
            ? todo.completed
            : !todo.completed;
      })
      .filter(todo =>
        filter.query
          ? todo.title.toLowerCase().includes(filter.query.toLowerCase())
          : true,
      );
  }, [filter.query, filter.status, todos]);

  const handleTodoSelect = (todo: Todo) => {
    dispatch(currentTodoSlice.actions.selectTodo(todo));
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
                className={classNames({
                  'has-background-info-light': todo.id === currentTodo?.id,
                })}
                key={todo.id}
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
                    onClick={() => handleTodoSelect(todo)}
                  >
                    <span className="icon">
                      <i
                        className={
                          todo === currentTodo
                            ? 'far fa-eye-slash'
                            : 'far fa-eye'
                        }
                      />
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
