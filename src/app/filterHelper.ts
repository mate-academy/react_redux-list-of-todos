import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

enum StatusTp {
  Active = 'active',
  Completed = 'completed',
}

export const filterTodos = (todos: Todo[], status: Status, query: string) => {
  return todos.filter(todo => {
    const filteredQuery = query.toLowerCase().trim();
    const soreted = todo.title.toLowerCase().includes(filteredQuery);

    switch (status) {
      case StatusTp.Active:
        return soreted && !todo.completed;
      case StatusTp.Completed:
        return soreted && todo.completed;
      default:
        return soreted;
    }
  });
};
