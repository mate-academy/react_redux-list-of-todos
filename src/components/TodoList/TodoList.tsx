/* eslint-disable */
import React from 'react';
import { setCurrentTodo, clearCurrentTodo } from '../../features/currentTodo';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import classNames from 'classnames';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();

  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const todos = useSelector((state: RootState) => state.todos);
  const { query, status } = useSelector((state: RootState) => state.filter);

  const visibleTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    if (status === 'active') {
      return !todo.completed && matchesQuery;
    }

    if (status === 'completed') {
      return todo.completed && matchesQuery;
    }

    return matchesQuery;
  });

  return (
    <>
      {visibleTodos.length === 0 ? (
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
            {visibleTodos.map(todo => (
              <tr
                data-cy="todo"
                key={todo.id}
                className={classNames(
                  currentTodo?.id === todo.id
                    ? 'has-background-info-light'
                    : '',
                )}
              >
                <td className="is-vcentered">{todo.id}</td>
                <td>
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
                    onClick={() => {
                      if (currentTodo?.id === todo.id) {
                        dispatch(clearCurrentTodo());
                      } else {
                        dispatch(setCurrentTodo(todo));
                      }
                    }}
                  >
                    <span className="icon">
                      {currentTodo?.id === todo.id ? (
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
      )}
    </>
  );
};
