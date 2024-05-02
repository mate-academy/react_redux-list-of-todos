/* eslint-disable */
import React from 'react';
import { useAppSelector } from '../../app/hooks';

import { Todos } from '../Todos';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter.filter);
  const query = useAppSelector(state => state.filter.query);

  const filteredTodos = todos.filter(todo => {
    const { completed, title } = todo;

    const queryMatch = title.toLowerCase().includes(query.toLowerCase());

    switch (filter) {
      case 'all':
        return queryMatch;

      case 'active':
        return !completed && queryMatch;

      case 'completed':
        return completed && queryMatch;

      default:
        return queryMatch;
    }
  });

  return (
    <>
      {!filteredTodos.length ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      ) : (
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
            <Todos todos={filteredTodos} />
          </tbody>
        </table>
      )}
    </>
  );
};
