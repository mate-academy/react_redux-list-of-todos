import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

export const prepareTodos = (task: Todo[], { query, status }: Filter) => {
  let todosCopy = [...task];

  if (query) {
    const normalize = query.trim().toLowerCase();

    todosCopy = todosCopy
      .filter(todo => (todo.title).trim().toLowerCase().includes(normalize));
  }

  if (status !== 'all') {
    todosCopy = todosCopy.filter(todo => {
      switch (status) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return todo;
      }
    });
  }

  return todosCopy;
};
