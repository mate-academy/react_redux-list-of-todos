import { todosPromise } from './todos';
import { usersPromise } from './users';

export default async() => {
  const [allDataTodos, allUsersData] = (
    await Promise.all([todosPromise(), usersPromise()])
  );

  return allDataTodos.map(todo => ({
    ...todo,
    user: allUsersData.find(user => user.id === todo.userId),
  }));
};
