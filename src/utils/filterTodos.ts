import { Todo } from '../types/Todo';
import { TodoCompletedCategory } from '../types/todoCompletedCategory';

export function filterTodos(
  todos: Todo[],
  todoCategory: TodoCompletedCategory,
  query: string,
): Todo[] {
  switch (todoCategory) {
    case TodoCompletedCategory.active:
      return todos.filter(
        todo => !todo.completed && todo.title.toLowerCase().includes(query),
      );
    case TodoCompletedCategory.competed:
      return todos.filter(
        todo => todo.completed && todo.title.toLowerCase().includes(query),
      );
    default:
      return todos.filter(todo => todo.title.toLowerCase().includes(query));
  }
}
