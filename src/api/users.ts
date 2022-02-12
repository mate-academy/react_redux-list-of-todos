const USER_API = 'https://mate.academy/students-api/users/';

export function getUser(userId: number): Promise<User> {
  return fetch(`${USER_API}${userId}`)
    .then(response => response.json());
}
