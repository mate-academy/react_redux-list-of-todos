const API = 'https://jsonplaceholder.typicode.com/todos';

export const getTodos = () => fetch(API).then(response => response.json());
