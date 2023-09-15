import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

function prepareString(str: string) {
  return str.toLowerCase().trim();
}

export const prepareTodos = (todos: Todo[], { query, status }: Filter) => {
  let todosCopy = [...todos];

  if (query) {
    const preparedQuery = prepareString(query);

    todosCopy = todosCopy.filter(
      todo => prepareString(todo.title).includes(preparedQuery),
    );
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
