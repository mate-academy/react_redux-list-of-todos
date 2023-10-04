import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const filterTodos
= (filterBy: Status, filterByQuery: string, innerTodos: Todo[]): Todo[] => {
  const copyOfTodos: Todo[] = [...innerTodos];
  let preparedTodos = [...copyOfTodos];

  if (filterBy !== 'all') {
    preparedTodos = copyOfTodos.filter(todo => {
      switch (filterBy) {
        case 'active':
          return todo.completed === false;
        case 'completed':
          return todo.completed === true;
        default:
          return true;
      }
    });
  }

  const preparedTodosStage2 = preparedTodos.filter(todo => {
    return todo.title.toLowerCase().includes(filterByQuery.toLowerCase());
  });

  return preparedTodosStage2 as Todo[];
};
