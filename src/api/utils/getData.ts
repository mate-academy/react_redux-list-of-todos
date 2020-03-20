export const getData = <T>(url: string): Promise<T> => fetch(url).then(response => response.json());
