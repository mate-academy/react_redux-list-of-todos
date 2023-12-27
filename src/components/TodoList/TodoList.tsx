import { TodoInfo } from '../TodoInfo';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { FilterStatus } from '../../types/Status';

export const TodoList = () => {
  const todos = useAppSelector((state: RootState) => state.todos);
  const filter = useAppSelector((state) => state.filter);
  const { filterStatus } = filter;
  const searchTerm = filter.query;

  const filteredTodos = todos.filter((todo) => {
    const statusMatch = filterStatus === FilterStatus.All
      || (filterStatus === FilterStatus.Active && !todo.completed)
      || (filterStatus === FilterStatus.Completed && todo.completed);

    const searchMatch = searchTerm
      ? todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    return statusMatch && searchMatch;
  });

  if (!filteredTodos.length) {
    return (
      <p className="notification is-warning">
        There are no todos matching the current filter criteria
      </p>
    );
  }

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>

          <th aria-label="Complited">
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>

          <th>Title</th>
          <th aria-label="Show modal"> </th>
        </tr>
      </thead>
      <tbody>
        {filteredTodos.map((todo) => (
          <TodoInfo key={todo.id} todo={todo} />
        ))}
      </tbody>
    </table>
  );
};
