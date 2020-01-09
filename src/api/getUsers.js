const URL = 'https://jsonplaceholder.typicode.com/users';

export const loadUsersFromServer = async() => {
  const response = await fetch(URL);

  return response.json();
};
