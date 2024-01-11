import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

export const visibleArray = (
  todosAr: Todo[],
  filterBy: Status,
  query: string,
): Todo[] => {
  let copy = [...todosAr];

  if (query) {
    copy = copy.filter(el => el.title.includes(query));
  }

  if (filterBy !== 'all') {
    copy = copy.filter(el => (
      filterBy === 'active' ? !el.completed : el.completed
    ));
  }

  return copy;
};
