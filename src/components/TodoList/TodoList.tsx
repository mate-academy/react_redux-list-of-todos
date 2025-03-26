import { useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import { StatusTypes } from '../../types/Status';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  const filteredTodos = useMemo(() => {
    const normalizedQuery = query.toLowerCase();

    switch (status) {
      case StatusTypes.ACTIVE:
        return todos.filter(
          todo =>
            !todo.completed &&
            todo.title.toLowerCase().includes(normalizedQuery),
        );
      case StatusTypes.COMPLETED:
        return todos.filter(
          todo =>
            todo.completed &&
            todo.title.toLowerCase().includes(normalizedQuery),
        );
      default:
        return todos.filter(todo =>
          todo.title.toLowerCase().includes(normalizedQuery),
        );
    }
  }, [todos, status, query]);

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
