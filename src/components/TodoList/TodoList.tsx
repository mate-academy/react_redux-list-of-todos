/* eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Todo } from '../../types/Todo';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);
  const { query, status } = useSelector((state: RootState) => state.filter);
  const currentTodo = useSelector((state: RootState) => state.currentTodo);

  const visibleTodos = todos.filter(todo => {
    const matchesStatus =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);

    const matchesQuery = todo.title
      .toLowerCase()
      .includes(query.trim().toLowerCase());

    return matchesStatus && matchesQuery;
  });

  return (
    <>
      {visibleTodos.length < 1 && (
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
          {visibleTodos.map((todo: Todo) => (
            <tr data-cy="todo">
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
                    !todo.completed ? 'has-text-danger' : 'has-text-success'
                  }
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
                    dispatch(setCurrentTodo(todo));
                  }}
                >
                  <span className="icon">
                    <i
                      className={
                        currentTodo !== todo ? 'far fa-eye' : 'far fa-eye-slash'
                      }
                    />
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
