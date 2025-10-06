/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  showModal: (todo: Todo) => void;
  selectedId?: number;
  isLoading: boolean;
}

export const TodoList: React.FC<Props> = ({ todos, showModal, selectedId, isLoading }) => {
  return (
    <>
      {!isLoading && todos.length === 0 && (
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

          {todos.map(todo => (
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
                <p className={classNames({'has-text-success': todo.completed}, { "has-text-danger": !todo.completed })}>{todo.title}</p>
              </td>

              <td className="has-text-right is-vcentered">
                <button onClick={() => showModal(todo)} data-cy="selectButton" className="button" type="button">

                  {selectedId === todo.id ? (
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
