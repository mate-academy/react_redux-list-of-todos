const API_URL = 'https://mate.academy/students-api';

export async function getTodos(): Promise<Todo[]> {
  try {
    const todos = await fetch(`${API_URL}/todos`);

    return await todos.json();
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function getUser(userId: number): Promise<User> {
  try {
    const user = await fetch(`${API_URL}/users/${userId}`);

    return await user.json();
  } catch (error) {
    throw new Error(String(error));
  }
}
