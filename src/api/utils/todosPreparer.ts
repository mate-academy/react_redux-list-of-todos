import { getTodos } from './getTodos';
import { getUsers } from './getUsers';

export const todosPreparer = async () => {
  const todos = await getTodos();
  const users = await getUsers();

  return todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId) as User,
  }));
};
