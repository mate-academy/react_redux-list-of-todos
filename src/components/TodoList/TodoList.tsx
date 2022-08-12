import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  todoOpener: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({ todos, todoOpener }) => (
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
          className=""
          key={todo.id}
        >
          <td className="is-vcentered">{todo.id}</td>
          <th className="is-vcentered">
            <span className="icon">
              <i className={todo.completed === true
                ? 'fas fa-check'
                : undefined}
              />
            </span>
          </th>
          <td className="is-vcentered is-expanded">
            <p
              className={todo.completed === true
                ? 'has-text-success'
                : 'has-text-danger'}
            >
              {todo.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => todoOpener(todo)}
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
