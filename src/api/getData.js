const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export const getTodos = async() => {
  const result = await fetch(TODOS_URL);

  if (!result.ok) {
    throw new Error(`Could not fetch ${TODOS_URL}, received ${result.status}`);
  }

  return result.json();
};

export const getUsers = async() => {
  const result = await fetch(USERS_URL);

  if (!result.ok) {
    throw new Error(`Could not fetch ${USERS_URL}, received ${result.status}`);
  }

  return result.json();
};
