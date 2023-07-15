import { Status } from './types/Status';
import { Todo } from './types/Todo';
import { User } from './types/User';

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function get<T>(url: string): Promise<T> {
  // eslint-disable-next-line prefer-template
  const fullURL = BASE_URL + url + '.json';

  return wait(300)
    .then(() => fetch(fullURL))
    .then(res => res.json());
}

export const getTodos = () => get<Todo[]>('/todos');

export const getUser = (userId: number) => get<User>(`/users/${userId}`);

export const getVisibleTodos = (
  todos: Todo[],
  selectedValue: string,
  query: string,
) => {
  let visibleTodos = todos;

  switch (selectedValue) {
    case Status.Active:
      visibleTodos = todos.filter(todo => !todo.completed);
      break;

    case Status.Completed:
      visibleTodos = todos.filter(todo => todo.completed);
      break;

    case Status.All:
    default:
      break;
  }

  if (query) {
    const normalizedQuery = query.toLowerCase().trim();

    return visibleTodos.filter(todo => todo.title.includes(normalizedQuery));
  }

  return visibleTodos;
};
