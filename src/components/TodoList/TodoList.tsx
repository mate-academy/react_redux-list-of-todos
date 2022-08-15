import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectTodo: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({ todos, selectTodo }) => (
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
          key={todo.id}
        >
          <td className="is-vcentered">
            {todo.id}
          </td>
          {todo.completed
            ? (
              <td className="is-vcentered">
                <i className="fas fa-check" />
              </td>
            )
            : (
              <td className="is-vcentered" />
            )}
          <td className="is-vcentered is-expanded">
            <p className={todo.completed
              ? 'has-text-success' : 'has-text-danger'}
            >
              {todo.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => selectTodo(todo.id)}
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
);
