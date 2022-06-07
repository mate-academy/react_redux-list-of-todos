const URL = 'https://mate.academy/students-api';

export async function getTodos() {
  const response = await fetch(`${URL}/todos`);

  return response.json();
}

export async function getUser(userId: number) {
  const response = await fetch(`${URL}/users/${userId}`);

  return response.json();
}
