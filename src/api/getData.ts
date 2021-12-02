export function getData <T>(API: string): Promise<T[]> {
  return fetch(API)
    .then(response => response.json())
    .then(fetchedData => fetchedData.data)
    .catch(error => error);
}
