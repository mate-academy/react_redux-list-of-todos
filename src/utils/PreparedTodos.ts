import { Todo } from '../types/Todo';

export function preparedTodos(
  query: string,
  todos: Todo[],
  field: string,
) {
  let isVisibleTodo = [...todos];
  const preparedQuery = query.toLocaleLowerCase().trim();

  if (preparedQuery) {
    isVisibleTodo = isVisibleTodo.filter(todo => {
      return todo
        .title
        .toLocaleLowerCase()
        .includes(preparedQuery);
    });
  }

  switch (field) {
    case ('active'):
      isVisibleTodo = isVisibleTodo.filter(todo => !todo.completed);
      break;

    case ('completed'):
      isVisibleTodo = isVisibleTodo.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  return isVisibleTodo;
}
