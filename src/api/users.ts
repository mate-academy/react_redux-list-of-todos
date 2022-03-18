const USER_API = 'https://mate.academy/students-api/users/';

export async function getUser(userId: number): Promise<User> {
  const response = await fetch(`${USER_API}${userId}`);

  return response.json();
}
