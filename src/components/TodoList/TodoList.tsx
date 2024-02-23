import { useAppSelector } from '../../app/hooks';
import { Filters, Todo } from '../../types';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos) || [];
  const filter = useAppSelector(state => state.filter);

  const filterByStatus = (): Todo[] => {
    switch (filter.status) {
      case Filters.ALL:
        return todos;
      case Filters.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case Filters.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const filterByQuery = (filtered: Todo[]): Todo[] => {
    const query = filter.query.toLowerCase().trim();

    return query
      ? filtered.filter(todo => todo.title.toLowerCase().includes(query))
      : filtered;
  };

  const filteredTodos = filterByQuery(filterByStatus());

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th aria-label="icon">
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th aria-label="empty header"> </th>
        </tr>
      </thead>

      <tbody>
        {filteredTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </tbody>
    </table>
  );
};
