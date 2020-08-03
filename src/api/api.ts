import { API_URL_TODOS, API_URL_USERS } from '../constants';
import { Todo, User, TodosWithUser } from '../interfaces';

const getData = async <T>(url: string): Promise<T[]> => {
  const response = await fetch(url).then(respond => respond.json());

  return response.data;
};

export const getPrepearedTodos = async (): Promise<TodosWithUser[]> => {
  const todos = await getData<Todo>(API_URL_TODOS);
  const users = await getData<User>(API_URL_USERS);

  return todos.map(todo => ({
    ...todo,
    user: users.find(person => person.id === todo.userId) as User,
  }));
};
