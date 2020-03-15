import { Todo, User } from './interfaces';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const USERS_URL = '/users';
const TODOS_URL = '/todos';

async function getData<T>(url: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${url}`);

  return response.json();
}

export const getUsers = (): Promise<User[]> => {
  return getData<User[]>(USERS_URL);
};

export const getTodos = (): Promise<Todo[]> => {
  return getData<Todo[]>(TODOS_URL);
};

export const getPreparedTodos = async () => {
  const [todosFromServer, users] = await Promise.all([getTodos(), getUsers()]);

  const todosWithUsers = todosFromServer.map((todo: Todo) => {
    const user = users.find((person: User) => person.id === todo.userId) as User;

    return {
      ...todo,
      user,
    };
  });

  return todosWithUsers;
};
