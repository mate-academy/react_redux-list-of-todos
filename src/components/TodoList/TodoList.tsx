/* eslint-disable */
import React from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';

type TodoListProps = {
  todos: Todo[];
  showModal: (todo: Todo) => void;
  selectedId?: number;
  isLoading: boolean;
};

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  showModal,
  selectedId,
  isLoading,
}) => {
  return (
    <>
      {!isLoading && !todos.length && (
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
          {todos.map((todoItem: Todo) => (
            <tr key={todoItem.id} data-cy="todo">
              <td className="is-vcentered">{todoItem.id}</td>
              <td className="is-vcentered">
                {todoItem.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>

              <td className="is-vcentered is-expanded">
                <p
                  className={classNames(
                    { 'has-text-success': todoItem.completed },
                    { 'has-text-danger': !todoItem.completed },
                  )}
                >
                  {todoItem.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => showModal(todoItem)}
                >
                  {selectedId === todoItem.id ? (
                    <span className="icon">
                      <i className="far fa-eye-slash" />
                    </span>
                  ) : (
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
