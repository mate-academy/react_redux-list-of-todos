import { TableRow } from '../TableRow';
import { Todo } from '../../types/Todo';

type Props = {
  visibleTodos: Todo[];
};

export const TableBody: React.FC<Props> = ({ visibleTodos }) => {
  if (!visibleTodos.length) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

  return (
    <tbody>
      {visibleTodos.map(todo => (
        <TableRow todo={todo} key={todo.title} />
      ))}
    </tbody>
  );
};
