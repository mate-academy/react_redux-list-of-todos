import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

export const filterBy = (todoList: Todo[], query: string, status: Status) => {
  let list = todoList;

  list = list.filter(item => item.title
    .toLowerCase().includes(query.toLowerCase().trim()));

  switch (status) {
    case 'active':
      list = list.filter(item => !item.completed);
      break;
    case 'completed':
      list = list.filter(item => item.completed);
      break;

    default:
      break;
  }

  return list;
};
