import { Status } from './types/Status';
import { StatusEnum } from './types/StatusEnum';
import { Todo } from './types/Todo';

export const getPreparedTodos = (todos: Todo[], status: Status) => {
  switch (status) {
    case StatusEnum.Active:
      return todos.filter(todo => !todo.completed);
    case StatusEnum.Completed:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};

export const getFilteredByQuery = (todos: Todo[], query: string) => {
  return todos.filter(item => {
    return item.title.toLowerCase().includes(query.toLowerCase());
  });
};
