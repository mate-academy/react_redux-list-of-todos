export const fetchUser = async (userId: number) => {
  let USER_URL = 'https://mate.academy/students-api/users';

  if (userId) {
    USER_URL += `/${userId}`;
  }

  try {
    const response = await fetch(USER_URL);

    return await response.json();
  } catch {
    return { name: 'no user' };
  }
};
