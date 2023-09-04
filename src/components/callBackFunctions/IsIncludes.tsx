import { SelectedName } from '../../types/SelectedName';
import { Todo } from '../../types/Todo';

const filteredTodos = (
  todos: Todo[],
  query: string,
  filterBy: SelectedName,
) => {
  let filteredArray = [...todos];

  if (query) {
    filteredArray = filteredArray
      .filter(item => item.title.toLowerCase().trim()
        .includes(query.toLowerCase().trim()));
  }

  switch (filterBy) {
    case SelectedName.Completed:
      filteredArray = filteredArray.filter(item => item.completed);
      break;
    case SelectedName.Active:
      filteredArray = filteredArray.filter(item => !item.completed);
      break;
    default:
      break;
  }

  return filteredArray;
};

export default filteredTodos;
