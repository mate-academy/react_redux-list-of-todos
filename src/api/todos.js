const todosURL = 'https://jsonplaceholder.typicode.com/todos';

export const getTodos = () => fetch(todosURL)
  .then(response => response.json());
