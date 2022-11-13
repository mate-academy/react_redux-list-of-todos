import { useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos.todos);
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query).toLowerCase();

  const visibleTodos = useMemo(() => {
    const filteredTodos = todos.filter(todo => {
      switch (status) {
        case Status.ACTIVE:
          return !todo.completed;

        case Status.COMPLETED:
          return todo.completed;

        case Status.ALL:
        default:
          return todo;
      }
    }).filter(todo => todo.title.includes(query));

    return filteredTodos;
  }, [status, todos, query]);

  return (
    <>
      {!visibleTodos.length && (
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
          {visibleTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
