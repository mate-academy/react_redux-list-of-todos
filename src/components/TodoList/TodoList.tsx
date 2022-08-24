import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectUser: (id: number, todoId: number) => void;
};

export const TodoList: React.FC<Props> = ({ todos, selectUser }) => (
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
      {todos.map(todo => (
        <tr
          data-cy="todo"
          className={cn(
            todo.completed
              ? 'has-text-success has-background-success-light'
              : 'has-text-danger has-background-danger-light',
          )}
          key={todo.id}
        >
          <td className="is-vcentered">
            <span className="icon is-size-5">
              <i className={cn('fas',
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
              data-cy="selectButton"
              className="button is-outlined is-primary"
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
