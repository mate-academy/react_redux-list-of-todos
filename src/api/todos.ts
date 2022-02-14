import { Todo } from '../react-app-env';

const API_URL = 'https://mate.academy/students-api/todos';

export const getTodos = async (completed = 'all'): Promise<Todo[]> => {
  let response;

  switch (completed) {
    case 'active':
      response = await fetch(`${API_URL}?completed=false`);
      break;

    case 'completed':
      response = await fetch(`${API_URL}?completed=true`);
      break;

    default:
      response = await fetch(API_URL);
      break;
  }

  return response.json();
};
