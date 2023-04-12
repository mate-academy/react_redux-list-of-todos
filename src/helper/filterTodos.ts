import { Todo } from '../types/Todo';

export const filterTodos = (todos: Todo[], filterBy: string, query: string) => {
  const filtredTodos = filterBy === 'all'
    ? [...todos]
    : todos.filter(({ completed }) => {
      switch (filterBy) {
        case 'active':
          return completed;

        case 'completed':
          return !completed;

        default:
          return false;
      }
    });

  return filtredTodos.filter(({ title }) => {
    return title.toLowerCase().includes(query.toLowerCase());
  });
};
