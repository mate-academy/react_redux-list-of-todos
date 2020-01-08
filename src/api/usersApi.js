const URL = 'https://jsonplaceholder.typicode.com/users';
const getUsers = () => fetch(URL)
  .then(response => response.json())
  .catch(() => 'Something went wrong');

export default getUsers;
