const BASE_URL = 'http://localhost:5173/api';

export function getData<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url).then(async response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${await response.text()}`);
    }

    return response.json();
  });
}
