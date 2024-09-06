import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

interface State {
  query: string;
  status: Status;
}

export const filtredTodos = (todos: Todo[], filter: State) => {
  const filtred = todos.filter(todo =>
    todo.title.toLowerCase().trim().includes(filter.query.toLowerCase().trim()),
  );

  switch (filter.status) {
    case 'active':
      return filtred.filter(todo => todo.completed === false);
    case 'completed':
      return filtred.filter(todo => todo.completed === true);
    case 'all':
      return [...filtred];
    default:
      return filtred;
  }
};
