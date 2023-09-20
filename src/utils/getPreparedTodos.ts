import { Todo } from '../types/Todo';

export const getPreparedTodos = (
  todos: Todo[],
  query:string,
  status:string,
): Todo[] => {
  const filteredTodos = todos.filter(todo => {
    if (status === 'completed') {
      return todo.completed;
    }

    if (status === 'active') {
      return !todo.completed;
    }

    return todo;
  }).filter(todo => {
    const normalizedTitle = todo.title.toLowerCase();
    const normalizedQuery = query.toLowerCase().trim();

    return normalizedTitle.includes(normalizedQuery);
  });

  return filteredTodos;
};
