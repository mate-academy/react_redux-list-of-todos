import { Filter } from '../App';
import { Todo } from '../types/Todo';

export const filteringTodos = (
  array: Todo[],
  settings: { filterType: Filter; query: string },
) => {
  let arrayCopy = [...array];

  if (settings.filterType === Filter.Active) {
    arrayCopy = arrayCopy.filter(element => element.completed === false);
  }

  if (settings.filterType === Filter.Completed) {
    arrayCopy = arrayCopy.filter(element => element.completed === true);
  }

  if (settings.query) {
    arrayCopy = arrayCopy.filter(element =>
      element.title
        .toLowerCase()
        .includes(settings.query.toLowerCase().trimStart()),
    );
  }

  return arrayCopy;
};
