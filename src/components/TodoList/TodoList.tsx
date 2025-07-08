import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';
import { StatusType } from '../../types/Status';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);

  const filteredTodos = todos
    .filter(todo =>
      todo.title.toLowerCase().includes(query.toLocaleLowerCase()),
    )
    .filter(todo => {
      switch (status) {
        case StatusType.COMPLETED:
          return todo.completed;

        case StatusType.ACTIVE:
          return !todo.completed;
        default:
          return true;
      }
    });

  return (
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
          <tr key={todo.id} data-cy="todo">
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
                onClick={() =>
                  dispatch(currentTodoSlice.actions.selectTodo(todo))
                }
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
  );
};
