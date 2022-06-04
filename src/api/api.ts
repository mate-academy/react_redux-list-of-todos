const BASE_URL = 'https://mate.academy/students-api';

export const getTodosFromServer = async () => {
  const response = await fetch(`${BASE_URL}/todos`);

  return response.json();
};

export const getUserFromServer = async (userId: number) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`);

  return response.json();
};
