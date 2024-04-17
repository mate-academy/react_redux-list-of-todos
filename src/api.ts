import { Status } from './types/Status';
import { Todo } from './types/Todo';
import { User } from './types/User';

// eslint-disable-next-line operator-linebreak
const BASE_URL =
  'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

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

export const normalizeText = (text: string) => {
  return text.toLowerCase().trim();
};

export const getTodosFilter = (
  listTodos: Todo[],
  filterBy: Status,
  query: string,
) => {
  let filterTodos = [...listTodos];

  if (query) {
    filterTodos = filterTodos.filter(todo =>
      normalizeText(todo.title).includes(normalizeText(query)),
    );
  }

  switch (filterBy) {
    case Status.Active:
      return filterTodos.filter(todo => !todo.completed);
    case Status.Completed:
      return filterTodos.filter(todo => todo.completed);
    case Status.All:
    default:
      return filterTodos;
  }
};
