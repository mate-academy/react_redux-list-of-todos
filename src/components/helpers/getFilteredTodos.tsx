import { Todo } from '../../types/Todo';

function includesValue(searchStr: string, value: string) {
  return searchStr.toLowerCase().includes(value.toLowerCase());
}

export function getFilteredTodos(
  todos: Todo[],
  searchValue: string,
  selectValue: string,
): Todo[] {
  let newTodos = [...todos];

  switch (selectValue) {
    case 'completed':
      newTodos = newTodos.filter(todo => (
        todo.completed
        && includesValue(todo.title, searchValue)
      ));
      break;

    case 'active':
      newTodos = newTodos.filter(todo => (
        !todo.completed
        && includesValue(todo.title, searchValue)
      ));
      break;

    case 'all':
      newTodos = newTodos.filter(todo => (
        includesValue(todo.title, searchValue)
      ));
      break;

    default: throw new Error('Error: Invalid selectValue');
  }

  return newTodos;
}
