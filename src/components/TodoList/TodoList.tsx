/* eslint-disable max-len */
import { useMemo } from 'react';

import { useAppSelector } from '../../app/hooks';
import { getVisibleTodos } from '../../utils/todosHelper';
import { TableRow } from '../TableRow';

export const TodoList = () => {
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const visibleTodos = useMemo(() => {
    return getVisibleTodos(todos, filter);
  }, [filter]);

  return (
    <>
      {!visibleTodos.length
        ? (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        )
        : (
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
              {visibleTodos.map(todo => (
                <TableRow todo={todo} />
              ))}
            </tbody>
          </table>
        )}
    </>
  );
};
