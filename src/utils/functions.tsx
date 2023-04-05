import { Todo } from '../types/Todo';

export const filterTodos = (
  todos: Todo[], selectedStatus: string, query: string,
) => {
  let filteredTodos = todos.filter(todo => {
    switch (selectedStatus) {
      case 'active':
        return todo.completed === false;
      case 'completed':
        return todo.completed === true;
      case 'all':
      default:
        return true;
    }
  });

  if (query) {
    const normalizedQuery = query.toLowerCase();

    filteredTodos = filteredTodos
      .filter(todo => todo.title.toLowerCase().includes(normalizedQuery));
  }

  return filteredTodos;
};

export const findTodo = (todos: Todo[], todoId: number) => {
  return todos.find(todo => todo.id === todoId);
};
