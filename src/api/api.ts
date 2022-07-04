const url = 'https://mate.academy/students-api';

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${url}/todos`);

  return response.json();
};

export const getUser = async (userId: number): Promise<User> => {
  const response = await fetch(`${url}/users/${userId}`);

  return response.json();
};

export const deleteUser = async (userId: number) => {
  const response = await fetch(`${url}/todos/${userId}`, {
    method: 'DELETE',
  });

  return response;
};
