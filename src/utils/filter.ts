import { Todo } from '../types/Todo';

export const filteredList = (
  status: string,
  query: string,
  todos: Todo[],
): Todo[] => {
  let todosCopy = [...todos];

  if (status) {
    switch (status) {
      case 'active':
        todosCopy = todosCopy.filter(result => !result.completed);
        break;
      case 'completed':
        todosCopy = todosCopy.filter(result => result.completed);
        break;

      default:
        break;
    }
  }

  if (query) {
    const normalizeValue = query.toLowerCase().trim();

    todosCopy = todosCopy.filter(todo =>
      todo.title.toLowerCase().includes(normalizeValue),
    );
  }

  return todosCopy;
};
