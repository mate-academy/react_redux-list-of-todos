import { User, Todo, PreparedTodo } from './types';

const API_USERS = 'https://mate.academy/students-api/users';
const API_TODOS = 'https://mate.academy/students-api/todos';

const getData = (URL: string) => (
  fetch(URL).then(response => response.json())
);

export const loadTodosWithUsers = async (): Promise<PreparedTodo[]> => {
  const users = await getData(API_USERS);
  const todos = await getData(API_TODOS);

  return todos.data.map((todo: Todo) => ({
    ...todo,
    user: users.data.find((user: User) => user.id === todo.userId),
  }));
};
