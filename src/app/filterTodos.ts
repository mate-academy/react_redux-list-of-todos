import { Todo } from '../types/Todo';

export const filterTodos = (
  todos: Todo[],
  filter: { status: string; query: string },
) => {
  const allTodos = todos?.filter(todo =>
    todo.title.toLowerCase().includes(filter.query.toLowerCase()),
  );

  switch (filter.status) {
    case 'active':
      return allTodos?.filter(todo => !todo.completed);
    case 'completed':
      return allTodos?.filter(todo => todo.completed === true);

    default:
      return allTodos;
  }
};
