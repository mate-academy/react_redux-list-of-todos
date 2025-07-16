import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  selectedTodoId?: number;
  onSelect?: (user: Todo | null) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  onSelect = () => {},
}) => (
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
        <tr key={todo.id} data-cy="todo" className="">
          <td className="is-vcentered">{todo.id}</td>
          {todo.completed ? (
            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            </td>
          ) : (
            <td className="is-vcentered" />
          )}
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
            {todo.id === selectedTodoId ? (
              <button onClick={() => onSelect(null)} className="icon button">
                <i className="far fa-eye-slash" />
              </button>
            ) : (
              <button
                onClick={() => onSelect(todo)}
                className="icon button is-inverted"
              >
                <i className="far fa-eye" />
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
