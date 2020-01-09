const URL_USERS = 'https://jsonplaceholder.typicode.com/users';
const URL_TODOS = 'https://jsonplaceholder.typicode.com/todos';

export const fetchTodosAndUsers = () => Promise
  .all([fetch(URL_USERS), fetch(URL_TODOS)])
  .then(responses => Promise.all(responses.map(response => response.json())));
