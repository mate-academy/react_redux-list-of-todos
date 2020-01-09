const usersUrl = 'https://jsonplaceholder.typicode.com/users';

export const getUsersFromServer = () => fetch(usersUrl)
  .then(response => response.json());
