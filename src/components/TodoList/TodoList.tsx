/* eslint-disable max-len */
import React, { useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const filteredTodos = useMemo(() => {
    const queryLower = filter.query.toLowerCase().trim();
    let todosToFilter = [...todos];

    if (filter.query) {
      todosToFilter = todosToFilter.filter(todo => todo.title.toLowerCase().includes(queryLower));
    }

    if (filter.status !== 'all') {
      todosToFilter = todosToFilter.filter(todo => {
        switch (filter.status) {
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          default:
            return todo.completed;
        }
      });
    }

    return todosToFilter;
  }, [filter.query, filter.status]);

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
            {filteredTodos.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
