const TODOS_URL = 'https://mate.academy/students-api/todos';
const USER_BASE_URL = 'https://mate.academy/students-api/users/';

export const getTodos = (): Promise<Todo[]> => {
  return fetch(TODOS_URL)
    .then(responce => responce.json());
};

export const getUser = (userId: number): Promise<User> => {
  return fetch(USER_BASE_URL + userId)
    .then(responce => responce.json());
};
