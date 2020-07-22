import { TodoWithUser } from '../interfaces';

export const sortBy = (option: string, todos: TodoWithUser[], order: boolean) => {
  switch (option) {
    case 'title':
      return [...todos].sort((a, b) => (order
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)));

    case 'user':
      return [...todos].sort((a, b) => (order
        ? a.user.localeCompare(b.user)
        : b.user.localeCompare(a.user)));

    case 'completed':
      return [...todos].sort((a, b) => {
        if (order) {
          return (a.completed > b.completed) ? 1 : -1;
        }

        return (a.completed < b.completed) ? 1 : -1;
      });

    default:
      return todos;
  }
};
