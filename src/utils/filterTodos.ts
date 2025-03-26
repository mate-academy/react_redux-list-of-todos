import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const filterTodos = (todos: Todo[], status: Status, query: string) => {
  let filteredTodos = [...todos];

  switch (status) {
    case 'completed':
      filteredTodos = todos.filter(todo => todo.completed);
      break;

    case 'active':
      filteredTodos = todos.filter(todo => !todo.completed);
      break;

    case 'all':
      filteredTodos = [...todos];
      break;
  }

  if (query) {
    return filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return filteredTodos;
};
