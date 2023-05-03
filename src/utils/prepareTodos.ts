import { Todo } from '../types/Todo';
import { SortType } from '../types/SortType';

export const prepareTodos = (
  todos: Todo[],
  query: string,
  sortType: string,
):Todo[] => {
  let todosForRender = [...todos];

  if (query) {
    const lowQuery = query.toLowerCase();

    todosForRender = todosForRender.filter(
      todo => todo.title.toLowerCase().includes(lowQuery),
    );
  }

  todosForRender = todosForRender.filter(todo => {
    switch (sortType) {
      case SortType.ACTIVE:
        return !todo.completed;

      case SortType.COMPLETED:
        return todo.completed;

      case SortType.ALL:
        return true;

      default:
        throw new Error('Incorrect SortType data');
    }
  });

  return todosForRender;
};
