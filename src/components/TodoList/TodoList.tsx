/* eslint-disable max-len */
import React, { useMemo } from 'react';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);

  const queryFilter = (todoTitle: string, queryText: string) => {
    return todoTitle.toLowerCase().includes(queryText.toLowerCase());
  };

  const statusFilter = useMemo(() => {
    return todos.filter(({ title, completed }) => {
      switch (status) {
        case 'active':
          return !completed && queryFilter(title, query);

        case 'completed':
          return completed && queryFilter(title, query);

        default:
          return queryFilter(title, query);
      }
    });
  }, [todos, status, query]);

  return (
    <>
      {todos.length === 0 && (
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
          {statusFilter.map((todo: Todo) => {
            const { id, title, completed } = todo;

            return (
              <>
                <tr data-cy="todo">
                  <td className="is-vcentered">{id}</td>
                  <td className="is-vcentered">
                    {completed
                      ? (
                        <span className="icon" data-cy="iconCompleted">
                          <i className="fas fa-check" />
                        </span>
                      )
                      : null}
                  </td>

                  <td className="is-vcentered is-expanded">
                    <p className={classNames(
                      { 'has-text-danger': completed === false },
                      { 'has-text-success': completed === true },
                    )}
                    >
                      {title}
                    </p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button data-cy="selectButton" className="button" type="button">
                      <span className="icon">
                        <i className="far fa-eye-slash" />
                      </span>
                    </button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
