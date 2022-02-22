const API_URL = 'https://mate.academy/students-api/users/';

export async function getUser(userId: number) {
  const response = await fetch(`${API_URL}${userId}`);

  return response.json();
}
