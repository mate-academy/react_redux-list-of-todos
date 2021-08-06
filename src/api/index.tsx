// const TODOS_URL = 'https://mate-api.herokuapp.com/todos';
// const USERS_URL = 'https://mate-api.herokuapp.com/users/';
const BASE_URL = 'https://mate-api.herokuapp.com/';

// import { Todo } from '../types';

// export async function getTodos() {
//   const todos = await fetch(TODOS_URL);

//   return todos.json();
// }

// export async function getUser(id: string) {
//   const user = await fetch(USERS_URL + id);

//   return user.json();
// }


// const request = (url: string) => fetch(BASE_URL + url)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(`${response.status} - ${response.statusText}`);
//     }

//     return response.json();
//   })
//   .then(result => result.data);

const request = async(url: string) => {
  console.log(BASE_URL + url);
  const response = await fetch(BASE_URL + url);
  
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  
  return response.json();
};

export const getTodos = async() => {
  // NOTE: clear URL
  const response = await request('todos?id=95&id=96&id=97&id=98&id=99&id=100&id=101&id=102&id=103&id=104&id=105&id=106&id=107');
  // To test: todos?id=95&id=96&id=97&id=98&id=99&id=100&id=101&id=102&id=103&id=104&id=105&id=106&id=107

  return response;
};

export const getUser = async (id: number) => {
  const response = await request('users/' + id);

  return response;
};

// If we need to update a Todo
export const updateTodo = async(todo: any, id: string) => {
  const response = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify({ ...todo })
  })
  
  return response.json();
}
