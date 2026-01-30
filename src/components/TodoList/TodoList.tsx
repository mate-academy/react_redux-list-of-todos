/* eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import classNames from 'classnames';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos);
  const query = useSelector((state: RootState) => state.filter.query);
  const status = useSelector((state: RootState) => state.filter.status);
  const dispatch = useDispatch();

  const filteredTodos = todos
    .filter(
      todo =>
        status === 'all' ||
        (status === 'active' ? !todo.completed : todo.completed),
    )
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      {filteredTodos.length === 0 && (
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
          {filteredTodos.map((todo, index) => (
            <tr data-cy="todo">
              <td className="is-vcentered">{index + 1}</td>
              <td className="is-vcentered">
                {todo.completed ? (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                ) : (
                  ''
                )}
              </td>

              <td className="is-vcentered is-expanded">
                <p
                  className={classNames(
                    todo.completed
                      ? 'has-text-grey-light has-text-line-through'
                      : 'has-text-danger',
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
                    <i className="far fa-eye" />
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
