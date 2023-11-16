import { getFilteredTodos } from 'services';
import { useAppSelector } from 'app/hooks';
import { TableItem } from './ui/TableItem';

export const TodoList = () => {
  const filterParams = useAppSelector((state) => state.filter);
  const todos = useAppSelector((state) => state.todos);
  const filteredTodos = getFilteredTodos(todos, filterParams);

  if (!filteredTodos.length) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

  return (
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
        {filteredTodos.map((todo) => (
          <TableItem key={todo.id} todo={todo} />
        ))}
      </tbody>
    </table>
  );
};
