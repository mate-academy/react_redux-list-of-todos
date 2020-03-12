import { TodoType, UserType } from './interfaces';

const API_URL = 'https://jsonplaceholder.typicode.com/';

async function getData<T>(url: string): Promise<T> {
  const response = await fetch(url);

  return response.json();
}

export const getUsers = (): Promise<UserType[]> => {
  return getData(`${API_URL}users`);
};

export const getTodos = (): Promise<TodoType[]> => {
  return getData(`${API_URL}todos`);
};

export const getTodosWithUsers = async () => {
  const [todosFromServer, users] = await Promise.all(
    [getTodos(), getUsers()],
  );

  const preparedTodos = todosFromServer.map((todo) => {
    const user = users.find((person) => person.id === todo.userId) as UserType;

    return {
      ...todo,
      user,
    };
  });

  return preparedTodos;
};
