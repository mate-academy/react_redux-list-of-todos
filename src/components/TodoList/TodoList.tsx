import React, { useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import { getVisibleTodos } from '../../helpers/getVisibleTodos';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);

  const visibleTodos = useMemo(() => (
    getVisibleTodos(filter, todos, query)
  ), [todos, filter, query]);

  return (
    <>
      {!visibleTodos.length ? (
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
            {visibleTodos.map(todo => (
              <TodoItem todo={todo} key={todo.id} />
            ))}
          </tbody>
        </table>
      )}

    </>
  );
};
