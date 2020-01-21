const URL = 'https://jsonplaceholder.typicode.com/todos';

export const loadTodosFromServer = async() => {
  const response = await fetch(URL);

  return response.json();
};
