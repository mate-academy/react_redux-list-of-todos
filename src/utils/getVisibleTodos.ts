import { FilterTodoStatus } from '../features/filter';
import { Todo } from '../types/Todo';

export const getVisibleTodos = (
  todos: Todo[],
  select: string,
  query: string,
): Todo[] => {
  let filteredTodos = todos.filter(todo => {
    switch (select) {
      case FilterTodoStatus.ACTIVE:
        return !todo.completed;

      case FilterTodoStatus.COMPLETED:
        return todo.completed;

      default:
        return true;
    }
  });

  if (query) {
    filteredTodos = filteredTodos.filter(
      ({ title }) => title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return filteredTodos;
};
