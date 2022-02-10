import { BASE_URL } from '.';

export const deleteTodoFromServer = async (todoId: number) => {
  await fetch(`${BASE_URL}/todos/${String(todoId)}`, {
    method: 'DELETE',
  });
};
