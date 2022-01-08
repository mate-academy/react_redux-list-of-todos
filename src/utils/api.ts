const BASE_URL = 'https://mate.academy/students-api';

const request = async (endPoint = '') => {
  let data = [];

  try {
    const response = await fetch(`${BASE_URL}${endPoint}`);

    data = await response.json();
  } catch (error) {
    throw new Error(`Error with request ${error}`);
  }

  return data;
};

export const API = {
  getTodo: () => request('/todos'),
  getUserInfo: (userId: number) => request(`/users/${userId}`),
};
