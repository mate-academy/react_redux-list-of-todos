const BASE_URL = 'https://mate-api.herokuapp.com/';

const request = async(url: string) => {
  const response = await fetch(BASE_URL + url);
  
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  
  return response.json();
};

export const getTodos = async() => {
  const response = await request('todos/');

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
