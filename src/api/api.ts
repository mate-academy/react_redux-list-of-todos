const BASE_URL = 'https://mate.academy/students-api';

export const getTodos = async () => {
  const response = await fetch(`${BASE_URL}/todos`);

  return response.json();
};

export const getUser = async (userId: number) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`);

  return response.json();
};

export const deleteTodoByid = async (todoId: number) => {
  await fetch(`${BASE_URL}/todos/${todoId}`, {
    method: 'DELETE',
  });
};
