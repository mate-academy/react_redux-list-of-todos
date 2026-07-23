const BASE_URL =
  'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

export async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error('Failed to fetch');
  }

  return response.json();
}
