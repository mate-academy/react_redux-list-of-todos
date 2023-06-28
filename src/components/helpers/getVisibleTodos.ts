import { Todo } from '../../types/Todo';

export const getVisibleTodos = (
  filterCase: string,
  todos: Todo[],
  searchQuery: string,
) => {
  let filteredTodos;

  switch (filterCase) {
    case 'active':
      filteredTodos = todos.filter(todo => !todo.completed);
      break;

    case 'completed':
      filteredTodos = todos.filter(todo => todo.completed);
      break;

    default:
      filteredTodos = todos;
      break;
  }

  if (searchQuery.trim()) {
    return filteredTodos.filter(todo => (
      todo.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
    ));
  }

  return filteredTodos;
};
