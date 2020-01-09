export const usersPromise = async() => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const result = await response.json();

  return result;
};
