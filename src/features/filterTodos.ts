import { Todo } from '../types/Todo';

enum FilterOption {
  active = 'active',
  completed = 'completed',
  all = 'all',
}

export const filterTodos = (
  todos: Todo[],
  filterStatus: string,
  filterQuery: string,
): Todo[] => {
  let newTodos = [...todos];

  if (filterStatus) {
    newTodos = newTodos.filter(item => {
      switch (filterStatus) {
        case FilterOption.active:
          return item.completed === false;
        case FilterOption.completed:
          return item.completed;
        case FilterOption.all:
        default:
          return true;
      }
    });
  }

  if (filterQuery) {
    newTodos = newTodos.filter(item => {
      return item.title.toLowerCase().includes(filterQuery.toLowerCase());
    });
  }

  return newTodos;
};
