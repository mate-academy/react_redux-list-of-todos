const URL_API = 'https://jsonplaceholder.typicode.com/users';

export const usersFromServer = () => (
  fetch(URL_API)
    .then(response => response.json())
);
