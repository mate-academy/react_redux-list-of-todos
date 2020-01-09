const URL = 'https://jsonplaceholder.typicode.com/users';

export const getUsersFromServer = () => fetch(URL)
  .then(response => response.json());
