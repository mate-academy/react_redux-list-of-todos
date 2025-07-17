import React, { useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const query = useAppSelector((state: RootState) => state.filter.query);
  const status = useAppSelector((state: RootState) => state.filter.status);

  const filteredTodos = useMemo(() => {
    const filteredByQuery = todos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );

    switch (status) {
      case 'completed':
        return filteredByQuery.filter(todo => todo.completed);
      case 'active':
        return filteredByQuery.filter(todo => !todo.completed);
      default:
        return filteredByQuery;
    }
  }, [query, status, todos]);

  return (
    <>
      {' '}
      {filteredTodos.length > 0 ? (
        <>
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
              {filteredTodos.map((todo: Todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
    </>
  );
};
