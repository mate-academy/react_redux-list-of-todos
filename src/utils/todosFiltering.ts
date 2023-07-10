import { Todo } from '../types/Todo';
import { SelectValues } from '../types/SelectValues';

export const filteringBySelect = (todos: Todo[], value: string) => {
  return todos.filter(todo => {
    switch (value as SelectValues) {
      case SelectValues.Completed:
        return todo.completed;
      case SelectValues.Active:
        return !todo.completed;
      default:
        return true;
    }
  });
};

export const filteringBySearch = (todos: Todo[], value: string) => {
  // if (!value) {
  //   return todos;
  // }
  if (!value || !value.trim().length) {
    return todos;
  }

  return todos.filter((todo) => {
    return todo.title.toLowerCase().includes(value.toLowerCase());
  });
};
