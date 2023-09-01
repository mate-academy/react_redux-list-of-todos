import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const { todos, filterByStatus, filterByQuery } = useAppSelector((state) => ({
    todos: state.todos,
    filterByStatus: state.filter.status,
    filterByQuery: state.filter.query,
  }));

  const filteredTodos = React.useMemo(() => {
    return todos.filter((todo) => {
      const statusMatches
        = filterByStatus === 'all'
        || (filterByStatus === 'completed' ? todo.completed : !todo.completed);

      const queryMatches = todo.title
        .toLowerCase()
        .replace(/\s+/, '')
        .includes(
          filterByQuery
            .toLowerCase()
            .replace(/\s+/, ''),
        );

      return statusMatches && queryMatches;
    });
  }, [todos, filterByStatus, filterByQuery]);

  return (
    <>
      {filteredTodos.length < 1 ? (
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
            {filteredTodos.map((todo) => {
              return <TodoItem key={todo.id} todo={todo} />;
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
