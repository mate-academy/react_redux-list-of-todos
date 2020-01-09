const todosUrl = 'https://jsonplaceholder.typicode.com/todos';

export const getTodosFromServer = () => fetch(todosUrl)
  .then(response => response.json());
