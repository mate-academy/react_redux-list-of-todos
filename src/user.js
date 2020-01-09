const API = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = () => fetch(API).then(response => response.json());
