import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

type Filter = {
  query: string;
  status: Status;
};

export const filterTodos = (todos: Todo[], filterProperties: Filter) => {
  let copiedTodos = [...todos];
  const { query, status } = filterProperties;

  switch (status) {
    case 'active':
      copiedTodos = copiedTodos.filter(todo => !todo.completed);
      break;

    case 'completed':
      copiedTodos = copiedTodos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  if (query.length) {
    copiedTodos = copiedTodos.filter(({ title }) => (
      title.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())
    ));
  }

  return copiedTodos;
};
