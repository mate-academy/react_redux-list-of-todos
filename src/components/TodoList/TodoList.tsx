/* eslint-disable max-len */
import React, { useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import { filterTodos } from '../../utils/filterTodos';
import { TableList } from '../TableList';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const filterStatus = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);

  const visibleTodos = useMemo(() => {
    return filterTodos(filterStatus, query, todos);
  }, [filterStatus, query]);

  return (
    <>
      {!visibleTodos.length && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {!!visibleTodos.length && (
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

            <TableList renderedTodos={visibleTodos} />
          </tbody>
        </table>
      )}
    </>
  );
};
