import { ensure } from './utils/helpers';

const USERS_API = 'https://jsonplaceholder.typicode.com/users';
const TODOS_API = 'https://jsonplaceholder.typicode.com/todos';

const users = fetch(USERS_API)
  .then((response): Promise<User[]> => response.json()
    .then(data => {
      return data;
    }));
const todos = fetch(TODOS_API)
  .then((response): Promise<Todo[]> => response.json()
    .then(data => {
      return data;
    }));

export const todosFromServer = Promise.all<User[], Todo[]>([users, todos])
  .then(result => {
    return result[1].map((todo: Todo) => (
      {
        ...todo,
        user: ensure(result[0].find((user: User) => (
          user.id === todo.userId
        ))),
      }
    ));
  });
