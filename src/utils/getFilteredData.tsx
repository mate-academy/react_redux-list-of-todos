import { Todo } from '../types/Todo';
import { SelectedType } from '../types/SelectedType';
import { Option } from '../types/Option';

export const getFilteredData = (
  todos: Todo[],
  { query, selectedCondition }: Option,
) => {
  let filteredData = [...todos];

  switch (selectedCondition) {
    case SelectedType.ACTIVE:
      filteredData = todos.filter(todo => !todo.completed);
      break;
    case SelectedType.COMPLETED:
      filteredData = todos.filter(todo => todo.completed);
      break;
    default:
      break;
  }

  const normalizeQuery = query.toLowerCase().trim();

  if (normalizeQuery) {
    filteredData = filteredData.filter(todo => {
      const todoName = todo.title.toLowerCase().trim();

      return todoName.includes(normalizeQuery);
    });
  }

  return filteredData;
};
