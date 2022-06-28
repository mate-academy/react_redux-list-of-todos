const API = 'https://mate.academy/students-api/';

export const getUserById = async (userId:number) => {
  const response = await fetch(`${API}users/${userId}`);

  return response.json();
};

export const getTodos = async () => {
  const response = await fetch(`${API}todos`);

  return response.json();
};

export const deleteTodo = async (todoId:number) => {
  await fetch(`${API}todos/${todoId}`, { method: 'DELETE' });
};
