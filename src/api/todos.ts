const API_URL = 'https://mate.academy/students-api/todos/';

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(API_URL);

  return response.json();
}

export async function deleteTodo(todoId: number) {
  await fetch(`${API_URL}${todoId}`, {
    method: 'DELETE',
  });

  return getTodos();
}
