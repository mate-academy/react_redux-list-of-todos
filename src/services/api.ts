const BASE_URL =
  'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function request<T>(url: string): Promise<T> {
  await wait(300);

  const response = await fetch(BASE_URL + url);

  if (!response.ok) {
    throw new Error();
  }

  return response.json();
}
