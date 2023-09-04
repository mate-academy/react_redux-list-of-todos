import { Todo } from '../../types/Todo';

const filteredTodos = (
  todos: Todo[],
  query: string,
  filterBy: string,
) => {
  let filteredArray = [...todos];

  if (query) {
    filteredArray = filteredArray
      .filter(item => item.title.toLowerCase().trim()
        .includes(query.toLowerCase().trim()));
  }

  switch (filterBy) {
    case 'Completed':
      filteredArray = filteredArray.filter(item => item.completed);
      break;
    case 'Active':
      filteredArray = filteredArray.filter(item => !item.completed);
      break;
    default:
      break;
  }

  return filteredArray;
};

export default filteredTodos;
