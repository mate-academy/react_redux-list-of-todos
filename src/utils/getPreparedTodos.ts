import { Todo } from '../types/Todo';

export const getPreparedTodos = (
  todos: Todo[],
  query: string,
  status: string,
) => {
  let todosCopy = [...todos];

  if (query.trim()) {
    todosCopy = todosCopy.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (status) {
    todosCopy = todosCopy.filter(todo => {
      switch (status) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return todos;
      }
    });
  }

  return todosCopy;
};
