import { Todo } from '../types/Todo';

export const filterTodosByQuery = (
  todos: Todo[],
  query: string,
): Todo[] => {
  if (!query) {
    return todos;
  }

  const queryLowerCase = query.trim().toLowerCase();

  return todos.filter(({ title }) => {
    const titleLowerCase = title.toLowerCase();

    return titleLowerCase.includes(queryLowerCase);
  });
};
