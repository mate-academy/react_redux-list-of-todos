import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export function filterTodos(todos: Todo[], query: string, status: string) {
  if (status === Status.All) {
    return todos.filter(todo => {
      const loweredTodoTitle = todo.title.toLowerCase();

      return loweredTodoTitle.includes(query.toLowerCase());
    });
  }

  return todos.filter(todo => {
    const loweredTodoTitle = todo.title.toLowerCase();

    return (
      loweredTodoTitle.includes(query.toLowerCase()) &&
      todo.completed === (status === Status.Active ? false : true)
    );
  });
}
