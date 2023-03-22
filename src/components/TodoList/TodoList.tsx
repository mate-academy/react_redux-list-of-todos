/* eslint-disable max-len */
import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectedItem: Todo | null,
  setSelectedItem: (todo: Todo) => void,
  isLoading: boolean,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedItem,
  setSelectedItem,
  isLoading: loading,
}) => (
  <table className="table is-narrow is-fullwidth">
    {!loading && (
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
    )}

    <tbody>
      {todos.map(todo => (
        <tr
          key={todo.id}
          data-cy="todo"
          className={classNames(
            {
              'has-background-info-light':
              selectedItem?.id === todo.id,
            },
          )}
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
            {/* eslint-disable-next-line max-len */}
            <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>
              {todo.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => setSelectedItem(todo)}
            >
              <span className="icon">
                {/* eslint-disable-next-line max-len */}
                <i className={selectedItem?.id === todo.id ? 'far fa-eye-slash' : 'far fa-eye'} />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
