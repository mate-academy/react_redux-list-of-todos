const TODOS_URL = 'https://mate.academy/students-api/todos';
const USER_BASE_URL = 'https://mate.academy/students-api/users/';

export const getTodos = (): Promise<Todo[]> => {
  // eslint-disable-next-line no-console
  console.log('fetch todos');

  return fetch(TODOS_URL)
    .then(responce => responce.json());
};

export const getUser = (userId: number): Promise<User> => {
  // eslint-disable-next-line no-console
  console.log('fetch user');

  return fetch(USER_BASE_URL + userId)
    .then(responce => responce.json());
};
