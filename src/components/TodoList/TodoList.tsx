import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectUser: (id: number, todoId: number) => void;
};

export const TodoList: React.FC<Props> = ({ todos, selectUser }) => (
  <table
    data-cy="listOfTodos"
    className="table is-narrow is-fullwidth"
  >
    <tbody>
      {todos.map(todo => (
        <tr
          className={classNames(
            todo.completed
              ? 'has-text-success has-background-success-light'
              : 'has-text-danger has-background-danger-light',
          )}
          key={todo.id}
        >
          <td className="is-vcentered">
            <span className="icon is-size-5">
              <i className={classNames('fas',
                todo.completed
                  ? 'fa-check-square'
                  : 'fa-ban')}
              />
            </span>
          </td>

          <td className="is-vcentered is-expanded">
            {todo.title}
          </td>

          <td className="has-text-right is-vcentered">
            <button
              className="button is-warning"
              type="button"
              onClick={() => {
                selectUser(todo.userId, todo.id);
              }}
            >
              {`Show ${todo.userId}`}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
