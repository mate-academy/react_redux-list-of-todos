/* eslint-disable */
import React, { useMemo } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setCurrentTodo } from '../../features/currentTodo';
import { Filter } from '../../features/filter';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector<RootState, Todo[]>(state => state.todos);
  const currentTodo = useSelector<RootState, Todo | null>(
    state => state.currentTodo,
  );
  const filter = useSelector<RootState, Filter>(state => state.filter);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const statusCondition =
        filter.status === 'all' ||
        (filter.status === 'completed' && todo.completed) ||
        (filter.status === 'active' && !todo.completed);

      const queryCondition = todo.title
        .toLowerCase()
        .includes(filter.query.toLowerCase());

      return statusCondition && queryCondition;
    });
  }, [filter.query, todos, filter.status]);

  return (
    <>
      {filteredTodos.length === 0 ? (
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
            {filteredTodos.map(todo => (
              <tr
                data-cy="todo"
                className={classNames(
                  currentTodo?.id === todo.id
                    ? 'has-background-info-light'
                    : '',
                )}
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
                    className={classNames(
                      todo.completed ? 'has-text-success' : 'has-text-danger',
                    )}
                  >
                    {todo.title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  {currentTodo?.id === todo.id ? (
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => dispatch(setCurrentTodo(null))}
                    >
                      <span className="icon">
                        <i className="far fa-eye-slash" />
                      </span>
                    </button>
                  ) : (
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => dispatch(setCurrentTodo(todo))}
                    >
                      <span className="icon">
                        <i className="far fa-eye" />
                      </span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
