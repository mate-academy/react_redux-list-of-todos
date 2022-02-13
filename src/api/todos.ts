const API_URL = 'https://mate.academy/students-api/todos';

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(API_URL);

  return response.json();
}

export const deleteTodo = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  return response.json();
};
