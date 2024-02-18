import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

export const getActiveTodos = (
  todoList: Todo[],
  filter: string,
  query: string,
) => {
  let prepTodos = [...todoList];

  prepTodos = prepTodos.filter(todo => {
    switch (filter) {
      case Filter.active:
        return !todo.completed;

      case Filter.completed:
        return todo.completed;

      default:
        return todo;
    }
  });

  if (query) {
    const normalizeQuery = query.toLowerCase();

    prepTodos = prepTodos.filter(
      todo => todo.title.toLowerCase().includes(normalizeQuery),
    );
  }

  return prepTodos;
};
