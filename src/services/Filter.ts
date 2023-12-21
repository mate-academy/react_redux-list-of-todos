import { Todo } from '../types/Todo';

export function filterAndSortTodos(
  query: string,
  status: string,
  todos: Todo[],
) {
  const filteredTodo = todos
    .filter((todo) => {
      if (status === 'active') {
        return !todo.completed;
      }

      if (status === 'completed') {
        return todo.completed;
      }

      return true;
    })
    .filter((todo) => {
      return todo.title.toUpperCase().includes(query.toUpperCase().trim());
    });

  return filteredTodo;
}
