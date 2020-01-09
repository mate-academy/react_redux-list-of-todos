const URL = 'https://jsonplaceholder.typicode.com/todos';

export const getTodosFromServer = () => fetch(URL)
  .then(response => response.json());
