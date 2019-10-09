const URL = 'https://jsonplaceholder.typicode.com/';

export const getData = url => fetch(`${URL}${url}`).then(response => response.json());
