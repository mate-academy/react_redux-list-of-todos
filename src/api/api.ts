// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

export const request = async (url: string) => {
  const response = await fetch(`${BASE_URL}${url}.json`);

  return response.json();
};
