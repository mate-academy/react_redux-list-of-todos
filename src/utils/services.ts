import { Filter } from '../types/Filter';
import { OptionValue } from '../types/OptionValue';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (todos: Todo[], filter: Filter) => {
  if (filter.status === OptionValue.Active) {
    return todos.filter(todo => todo.title.toLowerCase().includes(filter.query)
      && todo.completed === false);
  }

  if (filter.status === OptionValue.Completed) {
    return todos.filter(todo => todo.title.toLowerCase().includes(filter.query)
      && todo.completed === true);
  }

  return todos.filter(todo => todo.title.toLowerCase().includes(filter.query));
};
