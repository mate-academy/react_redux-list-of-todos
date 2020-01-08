const URL_API = 'https://jsonplaceholder.typicode.com/todos';

export const todosFromServer = () => (
  fetch(URL_API).then(response => response.json())
);
