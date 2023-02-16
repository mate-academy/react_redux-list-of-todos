import { FilterType } from './types/FilterType';
import { Status } from './types/Status';
import { Todo } from './types/Todo';

export const getVisibleTodos = (
  todos: Todo[],
  status:Status,
  query: string,
) => {
  return todos.filter((todo:Todo) => {
    switch (status) {
      case FilterType.ALL:
        return todo;

      case FilterType.ACTIVE:
        return !todo.completed;

      case FilterType.COMPLETED:
        return todo.completed;

      default:
        throw new Error('no such filter available');
    }
  })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
};
