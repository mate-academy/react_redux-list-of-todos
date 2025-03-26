import { Todo } from '../types/Todo';

export function getCorrectTodosArray(
  status: string,
  query: string,
  todos: Todo[],
) {
  let newTodos = [...todos];

  if (query.length > 0) {
    newTodos = [...todos].filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  switch (status) {
    case 'completed': {
      newTodos = newTodos.filter(todo => todo.completed);
      break;
    }

    case 'active': {
      newTodos = newTodos.filter(todo => !todo.completed);
      break;
    }

    default: {
      break;
    }
  }

  return newTodos;
}
