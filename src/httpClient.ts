const BASE_URL
  = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

export function getData<T>(url: string): Promise<T> {
  const fullURL = `${BASE_URL}${url}.json`;

  return fetch(fullURL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error');
      }

      return response.json();
    });
}
