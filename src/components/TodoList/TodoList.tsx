/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

function getFilteredTodos(todos: Todo[]): Todo[] {
  return todos;
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  const filteredTodos = getFilteredTodos(todos);

  return (
    <>
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>

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
          {filteredTodos.map(todo => {
            const { id, title, completed } = todo;

            return (
              <tr data-cy="todo" key={id}>
                <td className="is-vcentered">{id}</td>
                <td className="is-vcentered">
                  {completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p
                    className={`has-text-${completed ? 'success': 'danger'}`}
                  >
                    {title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button data-cy="selectButton" className="button" type="button">
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  );
};
