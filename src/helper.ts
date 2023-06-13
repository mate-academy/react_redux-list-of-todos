import { Status } from './types/Status';
import { Todo } from './types/Todo';

export const filterTodosByStatus = (todos: Todo[], status: Status): Todo[] => {
  switch (status) {
    case 'all':
      return todos;
    case 'active':
      return todos.filter(todo => todo.completed === false);
    case 'completed':
      return todos.filter(todo => todo.completed === true);
    default:
      return todos;
  }
};

export const filterTodosByQuery = (todos: Todo[], query: string) => {
  const queryToLower = query.toLowerCase();

  return todos.filter(({ title }) => (
    title.toLowerCase().includes(queryToLower)
  ));
};
