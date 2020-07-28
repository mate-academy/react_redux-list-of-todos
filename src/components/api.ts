import { User, Todo, PreparedTodo } from './types';

const API_USERS = 'https://mate.academy/students-api/users';
const API_TODOS = 'https://mate.academy/students-api/todos';

export const loadUsers = (): Promise<{data: User[]}> => (
  fetch(API_USERS).then(response => response.json()));

export const loadTodos = (): Promise<{data: Todo[]}> => (
  fetch(API_TODOS).then(response => response.json())
);

export const loadTodosWithUsers = async (): Promise<PreparedTodo[]> => {
  const users = await loadUsers();
  const todos = await loadTodos();

  return todos.data.map((todo: Todo) => ({
    ...todo,
    user: users.data.find((user: User) => user.id === todo.userId),
  }));
};
