import { Todo } from '../interfaces';

export const sortBy = (sortType: string, todos: Todo[], order: boolean) => {
  switch (sortType) {
    case 'completed':
      return [...todos].sort((a, b) => (
        order
          ? Number(a.completed) - Number(b.completed)
          : Number(b.completed) - Number(a.completed)
      ));

    case 'title':
      return [...todos].sort((a, b) => (
        order
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      ));

    case 'user':
      return [...todos].sort((a: any, b: any) => (order
        ? a.user?.name.localeCompare(b.user?.name)
        : b.user?.name.localeCompare(a.user?.name)));

    default:
      return todos;
  }
};
