import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectTodo: number,
  selectItems: (UserId: number, todoId: number) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectTodo,
  selectItems,
}) => {
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
        {todos.map((todo) => (
          <tr
            data-cy="todo"
            key={todo.id}
            className={classNames({
              'has-background-info-light': todo.id === selectTodo,
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
              {todo.id !== selectTodo ? (
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => selectItems(todo.userId, todo.id)}
                >
                  <span className="icon">
                    <i className="far fa-eye" />
                  </span>
                </button>
              ) : (
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                >
                  <span className="icon">
                    <i className="far fa-eye-slash" />
                  </span>
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
