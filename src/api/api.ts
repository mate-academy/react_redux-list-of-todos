const API_URL = 'https://mate.academy/students-api';

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${API_URL}/todos`);

  return response.json();
};

export const getUser = async (userId: number) => {
  const response = await fetch(`${API_URL}/users/${userId}`);

  return response.json();
};

export const removeTodo = async (todoId: number) => {
  return fetch(`${API_URL}/todos/${todoId}`, {
    method: 'DELETE',
  });
};

export const getFilteredTodosByStatus = async (completed: boolean): Promise<Todo[]> => {
  const response = await fetch(`${API_URL}/todos?completed=${completed}`);

  return response.json();
};
