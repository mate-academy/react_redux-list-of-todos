const BASE_URL = 'https://mate.academy/students-api';

export const getTodos = async () => {
  const request = await fetch(`${BASE_URL}/todos`);

  return request.json();
};

// export const addSomeTodo = async () => {
//   const request = await fetch(`${BASE_URL}/todos`,
//     {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         title: 'I think you need, '
//           + 'go chilling',
//         name: 'Jora',
//         userId: Math.floor(Math.random() * 101) + 1,
//         completed: false,
//       }),
//     });

//   return request;
// };

export const getUser = async (userId: number) => {
  const request = await fetch(`${BASE_URL}/users/${userId}`);

  return request.json();
};

export const deleteTodo = async (id: number) => {
  const request = await fetch(`${BASE_URL}/todos/${id}`, { method: 'DELETE' });

  return request;
};
