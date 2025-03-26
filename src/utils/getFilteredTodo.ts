import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

interface Props {
  status: Status;
  query: string;
}

export function getFilteredTodos(todos: Todo[], { query, status }: Props) {
  let filteredTodos = [...todos];

  if (status !== 'all') {
    filteredTodos = filteredTodos.filter(({ completed }) =>
      status === 'active' ? !completed : completed,
    );
  }

  const normalizedTitleFilter = query.toLocaleLowerCase().trim();

  if (normalizedTitleFilter) {
    filteredTodos = filteredTodos.filter(({ title }) =>
      title.toLocaleLowerCase().includes(normalizedTitleFilter),
    );
  }

  return filteredTodos;
}
