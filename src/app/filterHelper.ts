import { Todo } from '../types/Todo';

export const filtredByComleted = (
  nameFilter: string,
  todosList: Todo[],
): Todo[] => {
  switch (nameFilter) {
    case 'completed':
      return todosList.filter(todo => todo.completed === true);

    case 'active':
      return todosList.filter(todo => todo.completed === false);

    case 'all':
      return todosList;

    default:
      return todosList;
  }
};

export const filredByQuery = (
  searchQury: string, todosList: Todo[],
): Todo[] => {
  if (searchQury === '') {
    return todosList;
  }

  return (todosList
    .filter(
      todo => todo.title.toLowerCase().includes(searchQury.toLowerCase()),
    ));
};
