import { Todo } from '../types/Todo';
import { State } from '../features/filter';

export const filterTodos = (todos: Todo[], filter: State) => {
  let result = todos;

  result = result.filter(({ title }) => (
    title.toLowerCase().includes(filter.query.toLowerCase())
  ));

  switch (filter.status) {
    case 'active':
      return result.filter(({ completed }) => !completed);
    case 'completed':
      return result.filter(({ completed }) => completed);
    default:
      return result;
  }
};
