const BASE_URL = 'https://jsonplaceholder.typicode.com/';
export const getData = (url) => fetch(`${BASE_URL}${url}`).then(response => response.json());
