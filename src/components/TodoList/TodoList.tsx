/* eslint-disable */
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTodo } from '../../features/currentTodo';
import classNames from 'classnames';

export const TodoList: React.FC = () => {
  const { query, status } = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const filterTodos = useMemo(() => {
    let result = todos;

    switch (status) {
      case 'completed':
        result = result.filter(todo => todo.completed);
        break;
      case 'active':
        result = result.filter(todo => !todo.completed);
        break;
      case 'all':
      default:
        break;
    }

    if (query) {
      const normalizedQuery = query.toLowerCase().trim();

      result = result.filter(todo =>
        todo.title.toLowerCase().includes(normalizedQuery),
      );
    }

    return result;
  }, [query, status, todos]);

  const filterStatus = filterTodos.length;
  return (
    <>
      {filterStatus === 0 ? (
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
            {filterTodos.map(todo => (
              <tr data-cy="todo" className="" key={todo.id}>
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>
                <td className="is-vcentered is-expanded">
                  <p
                    className={classNames('is-expanded', {
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
                    onClick={() => dispatch(selectTodo(todo))}
                  >
                    <span className="icon">
                      <i
                        className={
                          todo.id === currentTodo?.id
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
      )}
    </>
  );
};
