const API_URL = 'https://mate.academy/students-api/users/';

export async function getUser(userId: number) {
  const responce = await fetch(`${API_URL}${userId}`);

  return responce.json();
}
