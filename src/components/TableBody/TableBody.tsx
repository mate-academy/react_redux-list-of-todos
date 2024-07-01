import { useAppSelector } from '../../app/hooks';
import { useMemo } from 'react';
import { TableRow } from '../TableRow';

enum Status {
  completed = 'completed',
  active = 'active',
}

export const TableBody: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(state => state.filter);

  const visibleTodos = useMemo(() => {
    let todosProcessed = [...todos];

    switch (status) {
      case Status.completed:
        todosProcessed = todosProcessed.filter(todo => !todo.completed);
        break;
      case Status.active:
        todosProcessed = todosProcessed.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    if (query) {
      todosProcessed = todosProcessed.filter(todo =>
        todo.title.includes(query),
      );
    }

    return todosProcessed;
  }, [status, query]);

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
        <TableRow todo={todo} key={todo.id} />
      ))}
    </tbody>
  );
};
