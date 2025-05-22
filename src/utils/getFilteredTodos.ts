import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

interface Options {
  query: string;
  status: Status;
}

export default function getFilteredTodos(todos: Todo[], options: Options) {
  const copyTodos = [...todos].filter(todo =>
    todo.title.toLowerCase().includes(options.query.toLowerCase()),
  );

  switch (options.status) {
    case 'active':
      return copyTodos.filter(todo => !todo.completed);
    case 'completed':
      return copyTodos.filter(todo => todo.completed);
  }

  return copyTodos;
}
