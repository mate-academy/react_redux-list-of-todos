import { Todo } from '../types/Todo';

export const preparedTodos = (
  todos: Todo[],
  query: string,
  status: string,
) => {
  let copyTodos = [...todos];

  if (query) {
    const normalizedQuery = query.trim().toLowerCase();

    copyTodos = copyTodos.filter(
      todo => todo.title.toLowerCase().includes(normalizedQuery),
    );
  }

  if (status) {
    switch (status) {
      case 'active':
        copyTodos = copyTodos.filter(todo => !todo.completed);
        break;

      case 'completed':
        copyTodos = copyTodos.filter(todo => todo.completed);
        break;

      case 'all':
      default:
        return copyTodos;
    }
  }

  return copyTodos;
};
