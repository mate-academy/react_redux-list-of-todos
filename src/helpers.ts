import { Todo } from './types/Todo';
import { Status } from './types/Status';

export const getVisibleTodos = (
  todos:Todo[],
  value: string,
  filter: Status,
) => {
  let copy = [...todos];

  switch (filter) {
    case Status.ACTIVE:
      copy = todos.filter(todo => !todo.completed);
      break;

    case Status.COMPLETED:
      copy = todos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  return copy.filter(todo => (
    todo.title.toLowerCase().includes(value.toLowerCase())
  ));
};
