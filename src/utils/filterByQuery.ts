import { Todo } from '../types/Todo';

export const filterByQuery = (query: string, todos: Todo[]) => {
  return todos.filter(({ title }) => {
    return title.toLowerCase().includes(query.toLowerCase());
  });
};
