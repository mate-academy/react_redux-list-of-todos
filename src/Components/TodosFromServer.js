const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';

export const todosFromServer = async() => {
  const response = await fetch(TODOS_URL);

  return response.json();
};
